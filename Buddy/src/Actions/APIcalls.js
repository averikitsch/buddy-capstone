import Amplify, { API } from 'aws-amplify-react-native';
import aws_exports from '../aws-exports';
Amplify.configure(aws_exports);

async saveUser() {
  let newNote = {
    body: {
      UserId: this.state.userId
      Wishlist: [],
      Logs: []],
    }
  }
  const path = "/Users";

  try {
    const apiResponse = await API.put("UsersCRUD", path, newNote)
    console.log("response from saving note: " + apiResponse);
    this.setState({apiResponse});
  } catch (e) {
    console.log(e);
  }
}
