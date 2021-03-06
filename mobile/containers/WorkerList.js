import { connect } from 'react-redux';
import Router from '../navigation/Router';
import TradesmanList from '../components/TradesmanList';
import Actions from '../actions/index';


const getFilteredUsers = (users, filter) => {
  if (!filter) {
    return users;
  }
  return users.filter(user => 
      user.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0 ||
      user.profession.toLowerCase().indexOf(filter.toLowerCase()) >= 0 ||
      user.location.toLowerCase().indexOf(filter.toLowerCase()) >= 0 ||
      user.description.toLowerCase().indexOf(filter.toLowerCase()) >= 0
  );
};

const mapStateToProps = (state) => {
  // pass  workers down as props (except for yourself)
  const users = state.workerList.workers;
  const signedInUserMobile = state.profile.mobile;
  const usersMinusYou = users.filter((user) => { return (user.mobile !== signedInUserMobile); });
  return {
    users: getFilteredUsers(usersMinusYou, state.workerList.filter),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  goToWorker: (profileObj) => {
    const params = {
      peerProfile: true,
      user: profileObj,
    };
    ownProps.navigator.push(Router.getRoute('profile', params));
  },
  updateWorkers: () => {
    dispatch(Actions.updateWorkerList());
  },
  userFilter: (filter) => {
    dispatch(Actions.changeUserFilter(filter));
  },
});

const WorkerList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TradesmanList);

export default WorkerList;
