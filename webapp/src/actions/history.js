import history from 'base/history';


/*
The history is the browser history: https://github.com/ReactTraining/history
We listen to changes in the URL (basically user clicks, or programmatic history.push).
On changes in the URL, we dispatch API fetch requests.
*/
export default (reduxStore) => {
  history.listen((location, action) => {
    let store = reduxStore.getState();
    let dispatch = reduxStore.dispatch;

    if (location.pathname === '/') {
    }
  });

  if (history.location.hash && history.location.hash === '#/') {
    history.push(history.location);
  }
}