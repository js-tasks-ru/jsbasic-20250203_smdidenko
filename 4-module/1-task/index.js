function makeFriendsList(friends) {
  let ulElement = document.createElement('ul');

  friends.forEach(friend => {
    let liElement = document.createElement('li');
    liElement.textContent = `${friend.firstName} ${friend.lastName}`;
    ulElement.appendChild(liElement);
  });

  return ulElement;

}
