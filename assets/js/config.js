/*
 * Cut Throat Kenny: site settings
 *
 * Every "Book" button on the site opens the link in `url` below.
 * The shop currently books through Squire. When Booksy is ready, replace `url`
 * with the Booksy link. Nothing else needs to change.
 * If `url` is left empty, the buttons scroll to the booking section, which asks people to call.
 */
window.CTK_CONFIG = {
  booking: {
    // The shop's online booking page.
    // Booksy links look like "https://booksy.com/en-gb/123456_cut-throat-kenny_barber-shop_..."
    url: "https://getsquire.com/discover/barbershop/cut-throat-kenny-royton-oldham",

    // Optional: a separate booking link for each barber.
    // Any left empty fall back to the main link above.
    barbers: {
      jason: "",
      magnus: "",
      travis: "",
    },

    // Open the booking page in a new tab (true) or the same tab (false).
    newTab: true,
  },
};
