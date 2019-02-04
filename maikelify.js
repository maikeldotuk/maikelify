document.title = "Facebook"

/*
*	This removes in that order
* chat box,create links, chat button, help button
*/
const crapToRemove = [
	'findFriendsNav',
	'fbDockChatBuddylistNub',
	'createNav',
	'u_0_d',
	'u_0_h',
  'u_ps_0_0_0',
  'u_ps_jsonp_10_0_0',
  'pagelet_pymk_timeline'
]

const complexCrap = [
  '._57fp > div:nth-child(1)',
  '._5h60',
	'#u_ps_jsonp_10_0_0',
  '.escapeHatchMinimal',
  '#pagelet_pymk_timeline'
]

function removeCrap() {
	console.log('Inside')
	for (const crapID of crapToRemove) {
		const elem = document.getElementById(crapID)
		if (elem) elem.remove()
	}
  for (const complexID of complexCrap) {
		const elem = document.querySelector(complexID)
		if (elem) elem.remove()
	}
}

const htmldata = `<h1>Facebook Cleaned</h1>
  <p>All the next elements have been deleted</p>
<ol>
  <li>Find friends</li>
  <li>Help &amp; Chat buttons</li>
  <li>Chat box</li>
  <li>Create ads or page links</li>
  <li>People you might know from your profile</li>
</ol>
<h2>Coming soon</h2>
<ol>
	<li>Remove People You might know from the wall</li>
  <li>Avoid ads</li>
	<li>Show the weather here</li>
</ol>
`

function removeAndChangeRightCol() {
  removeCrap()
	const rightCol = document.getElementById('rightCol')
	if (rightCol) {
		rightCol.children.item(0).remove()
		const e = document.createElement('span');
		e.innerHTML = htmldata;
		rightCol.appendChild(e);
	}
}


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    sendResponse({message: "goodbye"});
		removeAndChangeRightCol()
  }
);


