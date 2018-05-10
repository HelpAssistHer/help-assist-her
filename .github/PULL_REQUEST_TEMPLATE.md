## Description
_Remove this and add a detailed description of the changes that were made._
Changed the input styling on the Input component to remove border and add a 1px black bottom border. Added formatPhoneDigits, parsePhoneNumber functions to tie into the Redux form value life cycle hooks.

Verification form now displays two phone fields next to each other, one old and one new. The new one automatically formats the phone number into (234)-567-8901 format as the number is being typed. The old field gets an automatic +1 country code as soon as the user starts typing a phone number.

New phone number field is constrained to only digits - no letters or empty spaces allowed and the number is capped at 10 digits.
## Test Plan
_Remove this and add a test plan that the reviewer can use to test your changes._
