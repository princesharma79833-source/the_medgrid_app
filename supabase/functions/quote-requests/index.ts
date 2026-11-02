import { createClient } from "npm:@supabase/supabase-js@2.45.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
);

const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { ...corsHeaders, "Content-Type": "application/json" },
});

const text = (value: unknown, maxLength: number): string | null => {
  if (typeof value !== "string") return null;
  const clean = value.trim();
  return clean.length > 0 && clean.length <= maxLength ? clean : null;
};

const email = (value: unknown): string | null => {
  const clean = text(value, 320)?.toLowerCase() ?? null;
  return clean && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean) ? clean : null;
};

const referenceCode = () => `MG-${crypto.randomUUID().replaceAll("-", "").slice(0, 8).toUpperCase()}`;

Deno.serve(async (request: Request) => {
  if (request.method === "OPTIONS") return new Response(null, { status: 200, headers: corsHeaders });

  try {
    if (request.method !== "POST") return json({ error: "This request method is not supported." }, 405);
    const payload = await request.json();
    const action = payload?.action;

    if (action === "track") {
      const code = text(payload?.reference_code, 32)?.toUpperCase();
      const requesterEmail = email(payload?.email);
      if (!code || !requesterEmail) return json({ error: "Enter your reference code and email address." }, 400);

      const { data, error } = await supabase
        .from("quote_requests")
        .select("reference_code, status, created_at, updated_at")
        .eq("reference_code", code)
        .eq("email", requesterEmail)
        .maybeSingle();

      if (error) {
        console.error("quote tracking lookup failed", error);
        return json({ error: "We could not check this request right now." }, 500);
      }
      if (!data) return json({ error: "We could not find a request with those details." }, 404);
      return json({ request: data });
    }

    if (action !== "create") return json({ error: "This request could not be completed." }, 400);

    const fullName = text(payload?.full_name, 120);
    const requesterEmail = email(payload?.email);
    const phone = text(payload?.phone, 40);
    const country = text(payload?.country, 100);
    const careType = payload?.care_type === "ayush" ? "ayush" : payload?.care_type === "allopathic" ? "allopathic" : null;
    const treatment = text(payload?.treatment, 160);
    const preferredCity = text(payload?.preferred_city, 100);
    const timeline = text(payload?.timeline, 80);
    const conditionSummary = text(payload?.condition_summary, 2000);
    const donorRequired = payload?.donor_required === true;
    const donorRelationship = donorRequired ? text(payload?.donor_relationship, 100) : null;
    const donorBloodGroup = donorRequired ? text(payload?.donor_blood_group, 20) : null;
    const donorAge = donorRequired && Number.isInteger(payload?.donor_age) && payload.donor_age >= 0 && payload.donor_age <= 120 ? payload.donor_age : null;
    const donorHealthNotes = donorRequired ? text(payload?.donor_health_notes, 1000) : null;
    const travelPartySize = Number.isInteger(payload?.travel_party_size) && payload.travel_party_size >= 2 && payload.travel_party_size <= 10 ? payload.travel_party_size : null;

    if (!fullName || !requesterEmail || !phone || !country || !careType || !treatment || travelPartySize === null) {
      return json({ error: "Please complete the required contact and treatment fields." }, 400);
    }
    if (donorRequired && (!donorRelationship || !donorBloodGroup || donorAge === null)) {
      return json({ error: "Please complete the required donor details." }, 400);
    }

    const { data, error } = await supabase
      .from("quote_requests")
      .insert({
        reference_code: referenceCode(),
        full_name: fullName,
        email: requesterEmail,
        phone,
        country,
        care_type: careType,
        treatment,
        preferred_city: preferredCity,
        timeline,
        condition_summary: conditionSummary,
        donor_required: donorRequired,
        donor_relationship: donorRelationship,
        donor_blood_group: donorBloodGroup,
        donor_age: donorAge,
        donor_health_notes: donorHealthNotes,
        travel_party_size: travelPartySize,
      })
      .select("reference_code, status, created_at")
      .maybeSingle();

    if (error || !data) {
      console.error("quote request creation failed", error);
      return json({ error: "We could not submit your request right now." }, 500);
    }

    return json({ request: data }, 201);
  } catch (error) {
    console.error("quote request function failed", error);
    return json({ error: "We could not process this request." }, 500);
  }
});
