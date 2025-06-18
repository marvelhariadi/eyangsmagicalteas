import ShoppingCart from '../models/ShoppingCart.js';
import cron from 'node-cron';

// deletes non-active carts. uses node-cron to facilitate this.  done after 7 days.

const cleanupAbandonedCarts = async () => {
  console.log('Running abandoned carts cleanup job...');
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const result = await ShoppingCart.deleteMany({
      updatedAt: { $lt: sevenDaysAgo },
    });

    if (result.deletedCount > 0) {
      console.log(`Successfully deleted ${result.deletedCount} abandoned cart(s).`);
    } else {
      console.log('No abandoned carts found to delete.');
    }
  } catch (error) {
    console.error('Error during abandoned carts cleanup job:', error);
  }
};

// Schedule the job to run once a day at 3:00 AM
// You can adjust the schedule as needed. Format: 'minute hour day-of-month month day-of-week'
// e.g., '0 3 * * *' means at 03:00 every day.
const scheduleCartCleanup = () => {
  cron.schedule('0 3 * * *', cleanupAbandonedCarts, {
    scheduled: true,
    timezone: "America/Vancouver" // Optional: Set to your server's timezone
  });
  console.log('Abandoned cart cleanup job scheduled to run daily at 3:00 AM.');
};

export default scheduleCartCleanup;
