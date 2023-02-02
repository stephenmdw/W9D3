import { API, broadcast } from "./util";
import { followUser, unfollowUser } from "./util/api";

export default class FollowToggle {
  constructor(toggleButton) {
    this.toggleButton = toggleButton
    this.handleClick = this.handleClick.bind(this)
    this.toggleButton.addEventListener("click", this.handleClick)

  }

  async handleClick(event) {
    event.preventDefault()
    console.log(this.followState)
    //logic for handleClick
    if (this.followState === "followed"){
      this.unfollow()
    } else {
      this.follow()
    }
  }
  //how do we call the UserID from toggle button?
  //how do we set disabled/not disabled to a button
  async follow() {
    console.log(1, this.followState)
    this.followState = "following";
    console.log(2, this.followState)
    await followUser(this.toggleButton.dataset.userId);
    this.followState = "followed";
    console.log(3, this.followState)
  }

  async unfollow() {
    this.followState = "unfollowing";
    await unfollowUser(this.toggleButton.dataset.userId);
    this.followState = "unfollowed";
  }

  render() {
    console.log(this.followState)
    switch (this.followState) {
      case "followed":
        this.toggleButton.innerHTML = "Unfollow!"
        this.toggleButton.disabled = false
        break;
      case "unfollowed":
        this.toggleButton.innerHTML = "Follow!"
        this.toggleButton.disabled = false
        break;
      case "following":
        this.toggleButton.innerHTML = "Following..."
        this.toggleButton.disabled = true
        break;
      case "unfollowing":
        this.toggleButton.innerHTML = "Unfollowing..."
        this.toggleButton.disabled = true
        break;
    };
  }

  get followState() {
    return this.toggleButton.dataset.followState;
  }

  set followState(newState) {
    console.log("setter is working")
    this.toggleButton.dataset.followState = newState;
    this.render();
  }
}