// screen wakelock request
// stop screen from sleeping
const requestWakeLock = async() => {
    try {

        const wakeLock = await navigator.wakeLock.request('screen');

    } catch (err) {
        // the wake lock request fails - usually system related, such low as battery

        alert(`${err.name}, ${err.message}`);
    }
}

requestWakeLock();