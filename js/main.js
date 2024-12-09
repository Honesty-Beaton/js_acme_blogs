// This function creates a new Element with a specified element type as a string, text content
// and an optional className 
function createElemWithText(elementStrName = 'p', textContent = '', className = " ")
{
    // The new element is created
    const newElement = document.createElement(elementStrName);
    // The provided text content is created
    const newTextContent = document.createTextNode(textContent);

    // The new element has the text content added to it
    newElement.append(newTextContent);

    // if the class name is not empty, we assign the new Element a class
    if (className != " ") newElement.classList.add(className);

    // finally, we return this element
    return newElement;
}

// Test Data
const usersData = [
    {
        "id" : 1,
        "name": "Bret" 
    },
    {
        "id" : 2,
        "name": "Julia" 
    }
]

// Function for creating HTML option elements for recieved users data
function createSelectOptions(usersData)
{
    // First, we check that the paramater actually contains data 
    if (!usersData) return;

    // Empty array to hold the created elements
    const optionsArray = [];

    // Loops through each item in usersData, creating option elements for each user 
    // which contains their id and name.
    // Each created option is added to the options Array
    usersData.forEach(element => {
        let newOption = document.createElement("option");
        newOption.value = element.id;
        newOption.textContent = element.name;

        optionsArray.push(newOption);
    });

    // Populated options array is returned
    return optionsArray;
}

// Selects the section element with the given post ID and toggles the class "hide"
function toggleCommentSection(postId)
{
    // we return undefined if we do not have a post ID
    if (!postId) return undefined;

    // Testing purposes, creating a section
    const testSection = document.createElement('section');
    testSection.dataset.postId = postId;

    // selects the element with the given postID
    let element = document.querySelector(`section[data-post-id='${postId}']`);

    // ensures the selected element exists
    if (!element) return null;

    // and if it exists, we add the class "hide"
    element.classList.toggle('hide');

    return element;
}

// Selects a button element based on its postID and changes its text-content depending upon
// what the text content currently is.
// Returns undefined if postID does not exist, and null if the postId does exist but a 
// button was unable to be selected with that postId
function toggleCommentButton(postId)
{
    if (!postId) return undefined;

    // For testing function
    /*
    const testButton = document.createElement('button');
    testButton.dataset.postId = postId;
    testButton.textContent = "Show Comments";
    */

    let selectedButton = document.querySelector(`button[data-post-id='${postId}']`);
    if (!selectedButton) return null;

    const textContent = selectedButton.textContent;

    textContent === "Show Comments" 
        ? (selectedButton.textContent = "Hide Comments")
        : (selectedButton.textContent = "Show Comments");

    return selectedButton;
}

// Removes all children elements from the parentElement and returns the parentElement
function deleteChildElements(parentElement)
{
    // First, we make sure he parentElement param is an HTML element
    if (!(parentElement instanceof HTMLElement)) return undefined;

    // Then we access its last element
    let childVar = parentElement.lastElementChild;

    // the while loop continously assigns the last element to childVar and removes it
    // until all children elements are removed
    while (childVar != null)
    {
        parentElement.removeChild(childVar);
        childVar = parentElement.lastElementChild;
    }
    
    return parentElement;
}

//
function addButtonListeners()
{
    let mainSection = document.querySelector("main");
    
    let buttons = mainSection.querySelectorAll('button');

    if (buttons)
    {
        buttons.forEach(button => {
            let postID = button.dataset.postId;
            if (postID)
            {
                button.addEventListener("click", function (e) {toggleComments(e, postID)}, false);
            }
        });
    }

    return buttons;
}

// Removes the event listener for all buttons in the main section
function removeButtonListeners()
{
    let mainSection = document.querySelector("main");
    let buttons = mainSection.querySelectorAll("button");

    buttons.forEach(button => {
        let postID = button.dataset.postId;

        if (postID)
        {
            button.removeEventListener("click", toggleComments, false);
        }
    });

    return buttons;
}

// Creates an article section containing an h3 and two paragraphs for each piece of data
function createComments(commentsData)
{
    if (!commentsData) return undefined;
    const fragment = document.createDocumentFragment();

    commentsData.forEach(comment => {
        const article = document.createElement('article');
        
        const h3Elem = document.createElement('h3');
        h3Elem.textContent = comment.name;

        const paraElem = document.createElement('p');
        paraElem.textContent = comment.body;

        const fromElem = document.createElement('p');
        fromElem.textContent = `From: ${comment.email}`;

        article.append(h3Elem, paraElem, fromElem);
        fragment.appendChild(article);
    });

    return fragment;
}

// Creates an array of option elements and appends each element option to the 
// select menu.
// Returns a selectMenu element.
function populateSelectMenu(usersData)
{
    if (!usersData) return;

    const selectMenu = document.getElementById('selectMenu');
    if (!selectMenu) return null;

    const optionElementsArray = createSelectOptions(usersData);
    
    optionElementsArray.forEach(option => {
        selectMenu.append(option);
    });
    

    return selectMenu;
}

// Async / Await functions

// Async function that fetches user data from jsonplaceholder and returns that data
async function getUsers()
{
    try
    {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!res.ok) throw new Error("Status code not in 200-299 range.");
        
        const jsonUserData = await res.json();
        return jsonUserData;
    } catch (err)
    {
        console.error(err);
    }
}

// Async function that fetches and returns all posts from the specified userID
async function getUserPosts(userID)
{
    if(!userID) return;
    try
    {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userID}`);
        if (!res.ok) throw new Error("Status code not in 200-299 range.");

        const userPosts = await res.json();
        return userPosts;
    }catch (err)
    {
        console.error(err);
    }
}

// Fetches and returns only the specified userID user from jsonplaceholder
async function getUser(userID)
{
    if(!userID) return;
    try
    {
        const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userID}`);
        if (!res.ok) throw new Error("Status code not in 200-299 range.");

        const user = await res.json();

        return user;
    }catch (err)
    {
        console.error(err);
    }
}

// Fetches and returns all comments from a post with the specified postID
async function getPostComments(postID)
{
    if(!postID) return;

    try
    {
        const res = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postID}`);
        if (!res.ok) throw new Error("Status code not in 200-299 range.");

        const postComments = await res.json();
        return postComments;
    }catch (err)
    {
        console.error(err);
    }

}

// Async function that creates a section element, sets its postID to the postID param
// Comments are fetched based on the post ID, then added to the created section element
// The section element is then returned
async function displayComments(postID)
{
    if(!postID) return;

    const sectionElem = document.createElement('section');
    
    sectionElem.dataset.postId = postID;

    sectionElem.classList.add("comments", "hide");

    const comments = await(getPostComments(postID));

    const fragment = createComments(comments);

    sectionElem.append(fragment);

    return sectionElem;
}


async function createPosts(postsData)
{
    if(!postsData) return;

    const fragment = document.createDocumentFragment();
    const articles = []; // Empty list to hold created articles

    // For loop that creates various elements and appends them to a main article element
    for(const post of postsData) 
    {
        // Main article element
        const articleElem = document.createElement('article');

        //Post title h2 element
        const h2Elem = document.createElement('h2');
        h2Elem.textContent = post.title;

        // Post body p element
        const pElem = document.createElement('p');
        pElem.textContent = post.body;

        // Post ID p element
        const pIdElem = document.createElement('p');
        pIdElem.textContent = `Post ID: ${post.id}`;

        // Fetches the author for a post based on the posts userId
        const author = await getUser(post.userId);

        // Author name and company name p element
        const pAuthorElement = document.createElement('p');
        pAuthorElement.textContent = `Author: ${author.name} with ${author.company.name}`;

        // Author catch phrase p element
        const pAuthorCatchPhrase = document.createElement('p');
        pAuthorCatchPhrase.textContent = author.company.catchPhrase;
        
        // Button element with postId = post.id
        const commentButton = document.createElement('button');
        commentButton.textContent = "Show Comments";
        commentButton.dataset.postId = post.id;
        
        // All elements created so far are appended to the main article element
        articleElem.append(h2Elem, pElem, pIdElem, pAuthorElement, pAuthorCatchPhrase, commentButton);

        // Comments are fetched using the posts id
        const section = await displayComments(post.id);
        // and then added to the main article
        articleElem.append(section);

        // Each article is added to the list
        articles.push(articleElem);

    }
    // When the loop completes, all articles are added to the fragment
    articles.forEach(article => fragment.append(article));

    // Completed fragment is returned
    return fragment;
}

async function displayPosts(postsData)
{
    const mainElem = document.querySelector('main');
    if(!mainElem) return null;

    // Element variable is created as either a document fragment or a generic paragraph
    const element = postsData 
    ? await createPosts(postsData)
    : createElemWithText("p", "Select an Employee to display their posts.", "default-text");

    // Defined element is appended to the main section
    mainElem.append(element);

    // Defined element is returned
    return element;
}

/*-- Procedural Functions -- */
function toggleComments(event, postId)
{
    if(!event || !postId) return;

    event.target.listener = true;
    let sectionElem = toggleCommentSection(postId);

    let buttonElem = toggleCommentButton(postId);

    return [sectionElem, buttonElem];

}

async function refreshPosts(postsData)
{
    if(!postsData) return;
    const removeButtons = removeButtonListeners();


    const mainElem = deleteChildElements(document.querySelector('main'))

    const fragment = await displayPosts(postsData);

    const addButtons = addButtonListeners();

    return [removeButtons, mainElem, fragment, addButtons];
}

async function selectMenuChangeEventHandler(event)
{
    if(!event || event.type !== "change") return;

    if (event.target) event.target.disabled = true;

    const userId = (event.target?.value === "Employees") ? 1 : event.target?.value || 1;

    const posts = await getUserPosts(userId);

    const refreshPostsArray = await refreshPosts(posts);

    if (event.target) event.target.disabled = false;

    return [userId, posts, refreshPostsArray];
}

async function initPage()
{
    const users = await getUsers();

    const selectElem = populateSelectMenu(users);

    return [users, selectElem];
}

function initApp()
{
    initPage();
    document.getElementById('selectMenu').addEventListener("change", selectMenuChangeEventHandler, false);
}

addEventListener("DOMContentLoaded", initApp, false);