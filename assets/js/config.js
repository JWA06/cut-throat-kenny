/*
 * Cut Throat Kenny: site settings
 *
 * To switch on online booking, paste the shop's Booksy link into `url` below.
 * Every "Book" button on the site will then open Booksy. Nothing else needs to change.
 * While `url` is empty, the buttons scroll to the booking section, which asks people to call.
 */
window.CTK_CONFIG = {
  booking: {
    // The shop's Booksy page, for example:
    // "https://booksy.com/en-gb/123456_cut-throat-kenny_barber-shop_..."
    url: "",

    // Optional: a separate Booksy link for each barber.
    // Any left empty fall back to the main link above.
    barbers: {
      jason: "",
      magnus: "",
      travis: "",
    },

    // Open Booksy in a new tab (true) or the same tab (false).
    newTab: true,
  },
};
