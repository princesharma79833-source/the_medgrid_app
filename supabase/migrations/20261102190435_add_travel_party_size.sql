/*
# Add travel party size to quote requests

1. Modified Tables
- `quote_requests`
- `travel_party_size` (integer): Number of people traveling with the request, including the patient. Defaults to two because the standard package includes the patient and one accompanying person.

2. Security
- No new public access is introduced.
- The existing server-side function remains the only path for public creation and tracking.

3. Important Notes
- Values are constrained to a practical range of 2 to 10 people.
- Package estimates are calculated in the application from a two-person base and are confirmed by the coordinator.
*/

ALTER TABLE public.quote_requests
  ADD COLUMN IF NOT EXISTS travel_party_size integer NOT NULL DEFAULT 2;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'quote_requests_travel_party_size_check'
      AND conrelid = 'public.quote_requests'::regclass
  ) THEN
    ALTER TABLE public.quote_requests
      ADD CONSTRAINT quote_requests_travel_party_size_check CHECK (travel_party_size BETWEEN 2 AND 10);
  END IF;
END $$;
