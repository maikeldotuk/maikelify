function changeTextTop() {
  // TODO: Should be renamed to the real name of what is changing, it's also too long break it. 
  const whatsOnYourMind = document.querySelectorAll('textarea')[0]
  if (whatsOnYourMind && whatsOnYourMind.placeholder.indexOf("on your") !== -1  ) {
    const endname = whatsOnYourMind.placeholder.split(' ')[4]
    whatsOnYourMind.placeholder = "What ads should I show you today, " + endname
  }
  const picTop = document.querySelector('._mp3 > img:nth-child(1)')
  if (picTop) {
    picTop.src = "https://scontent-lht6-1.xx.fbcdn.net/v/t34.0-1/p160x160/" +
      "16176889_112685309244626_578204711_n.jpg?_nc_cat=1&_nc_ht=scontent-lh" + 
      "t6-1.xx&oh=e849ed09522244d0f75e3db0a0c858f6&oe=5C59F9E3" 
  }
}

/* Stuff to remove. Maybe it's worth thinking in loading this from a .json file as that would mean
** you could reuse it for many different websites
*/
const crapToRemove = [
  '#findFriendsNav',
  '#fbDockChatBuddylistNub',
  '#createNav',
  '#u_0_d',
  '#u_0_h',
  '#u_ps_0_0_0',
  '#u_ps_jsonp_10_0_0',
  '#pagelet_pymk_timeline',
  '._57fp > div:nth-child(1)',
  '#u_ps_jsonp_10_0_0',
  '.escapeHatchMinimal',
  '#pagelet_pymk_timeline',
  '#pagelet_rhc_footer'
]

function removeCrap() {
  for (const crapID of crapToRemove) {
    const elem = document.getElementById(crapID)
    if (elem) elem.remove()
  }
}

/* Only useful in Firefox, not chrome, Chrome uses chrome.extension */
const pathToImage = browser.extension.getURL("images/zucky.jpg")

/* Maybe you should read this from a file */
const htmldata = `
  <h1>Facebook Cleaned</h1>
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

function addEvilZucky() {
  if (!document.querySelector('#zucky')) {
    console.log('Adding Zucky')
    const contentCol = document.querySelector('#contentArea')
    const newImage = document.createElement('img')
    newImage.src = pathToImage
    newImage.id = 'zucky'
    newImage.width = document.querySelector('#pagelet_composer').clientWidth
    contentCol.insertBefore(newImage, contentCol.firstChild)
  }
}

function removeAndChangeRightCol() {
  removeCrap()
  const storiesTray = document.querySelector('#stories_tray') 
  if (storiesTray) {
    storiesTray.children[0].children[0].innerText = 'Deleted Stuff'
    storiesTray.children[0].children[1].remove()
    storiesTray.children[1].innerHTML = htmldata
  }
  addEvilZucky()
}

function changeNavBar() {
  const navBar = document.querySelector('#universalNav')
  navBar.children[0].children[0].children[1].children[1].innerText = "Fake News"
  navBar.children[0].children[1].children[0].children[1].innerText = "Pointless Chat"
  document.querySelector('._5qtp').innerText = "Make Mark Richer"
  document.title = "Zuckerbox"
  if (navBar.children[0].children.length > 2) {
    navBar.children[0].children[2].remove()
    navBar.children[0].children[2].remove()
  }
  document.querySelectorAll('._2aha')[0].innerText = "Face ID"
  document.querySelectorAll('._2aha')[1].innerText = "Victims"
  document.querySelectorAll('._2aha')[2].remove()
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    sendResponse({message: "goodbye"})
    removeAndChangeRightCol()
    changeTextTop()
    changeNavBar()
  }
)


