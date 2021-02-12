// screen wakelock request
// stop screen from sleeping
const requestWakeLock = async () => {
  try {
    const wakeLock = await navigator.wakeLock.request('screen');
    console.log("Awake")
  } catch (err) {
    // the wake lock request fails - usually system related, such low as battery
    console.log(`${err.name}, ${err.message}`);
    requestWakeLock();
  }
}

requestWakeLock();