# Travely
By: Harman Zhang, Ryan Le, Nobel Menghis, Trang Tran

# Project Description

## Who is our target audience?

<p>The primary target audience of our application is travelers. Whether they are traveling solo or in a group, our application is designed to streamline the travel planning experience and help travelers stay organized with their trips. We understand that travel planning can be time consuming and frustrating, and we want to create a platform for travelers to create and view all their trips all in one place. <p>

## Why does the audience want to use our application?
<p>Traveling can be an overwhelming experience for travelers due to the significant amount of itinerary details to track and several bookings made for each trip. Our audience would want to use this app as we address this pain point by offering them a platform to put all their plans in one spot and generate both custom and editable package pre-built itineraries. Additionally, those who travel in groups need a place to share their plan and coordinate and tour application offers this capability. This is through a community feature on our application that allows users to share their itineraries with each other and comment on them, hence, making the processes easier. Moverover, travelers that are looking for ideas on events and activities to participate in can use our application to discover these. Although there are travel planning applications such as flight booking websites like Expedia, it does not show places that are not related to flights such as hotels and entertainment booked on other websites, that our application offers.<p>

## Why do we as developers want to build this application?
<p>We as developers want to build this application because we understand the many details and steps that go into planning a trip as we have experienced it ourselves when traveling. This motivates us to develop an application that not only tracks their trips but also provides recommendations and a sense of community through comments. We offer the feature of customizing itineraries while discovering events and activities because we want to help travelers find new places to go and enjoy their travel planning experience.<p>


# Technical Description

## Architectural Diagram

<img src=https://github.com/trangtran10/Travely/blob/main/public/img/diagram.png alt="diagram"/>

## Data Flow

<img src=https://github.com/trangtran10/Travely/blob/main/public/img/dataFlow.png alt=dataflow/>

## User Stories

| Priority  | User | Description | Technical Implementation |
| --- | --- | --- | --- |
| P0 | As a user | I want to add and delete information from my itinerary plan. | To add an item, receive an itinerary ID from the user. To delete information, retrieve item IDs and remove matching entries.|
| P0 | As a user | I want to be able to create an itinerary. | When creating an itinerary or selecting from prebuilt ones, add the itinerary to MongoDB and its attributes. |
| P0 | As a user | I want to view all of the plans I created | When viewing all of the itinerary plans, return all the plans from the database that match the username value of the user’s username. |
| P0 | As a user | I want to be able to create an account and log into/out of it | When logging in, use Azure Authentication to authenticate users, and place them into our database. |
| P1 | As a user | I want to be able to view other itineraries | Retrieve all public itineraries or itineraries shared with the user from the database. |
| P1 | As a user | I want to be able to edit my profile preferences | When editing the profile page, retrieve the user and change the preferences field in the database. |
| P1 | As a user | I want to be able to comment on the itineraries | When commenting on an itinerary, retrieve the itinerary and update the comment field in the database. |
| P2 | As a user | I want to be able to search for everyone’s itineraries based on location names | When searching for a trip, retrieve all trip plans based on the user search input. |

## Endpoints

**User Authentication and Profile**

- POST /users/register
    - Description: Register a new user account.
    - Use Case: Allows users to create an account.
- POST /users/login
    - Description: User login.
    - Use Case: Authenticates user credentials and provides access to itinerary features.
- GET /users/profile
    - Description: Retrieve user profile information.
    - Use Case: Displays user profile details, including itinerary history and preferences.
- PUT /users/profile
    - Description: Update user profile details.
    - Use Case: Allows users to edit their profile, such as adding personal preferences.


**Itinerary**

- POST /itineraries
    Description: Create a new itinerary.
    Use Case: Allows users to start building a new itinerary from scratch or using a template.
- GET /itineraries
    Description: Retrieve all itineraries for the logged-in user.
    Use Case: Allows users to view a list of all their itineraries.
- GET /itineraries/[id]
    Description: Retrieve specific itinerary details.
    Use Case: Allows users to view and edit a specific itinerary.
- PUT /itineraries/[id]
    Description: Update itinerary details.
    Use Case: Enables users to modify their itinerary by adding, deleting, or checking off items.
- DELETE /itineraries/[id]
    Description: Delete a specific itinerary.
    Use Case: Allows users to remove unwanted itineraries.

**Itinerary Activities and Events**

- POST /itineraries/events
    - Description: Add an event or activity to an itinerary.
    - Use Case: Allows users to customize itineraries by adding activities.
- DELETE /itineraries/events/[id]
    - Description: Remove an event from an itinerary.
    - Use Case: Allows users to delete activities they no longer wish to include.

**Pre-built Itineraries**

- GET /prebuilt-itineraries
    - Description: Retrieve a list of pre-built itineraries.
    - Use Case: Provides users with ready-made itineraries to choose from.
- GET /prebuilt-itineraries/[id]
    - Description: Retrieve details of a specific pre-built itinerary.
    - Use Case: Enables users to view specific pre-built itineraries before adding them.

**Event Search and Location Information**

- GET /locations/
    - Description: Retrieve detailed information about a location.
    - Use Case: Provides users with specific information about a destination, such as popular sites or activity recommendations.

**Sharing and Collaboration**

- POST /itineraries/share
    - Description: Share an itinerary with other users or via a link.
    - Use Case: Allows users to share their plans with friends or other travelers.
- POST /itineraries/collaborators
    - Description: Add collaborators to an itinerary.
    - Use Case: Enables multiple users to edit or add to a shared itinerary.

**Additional Functionality for Administrators**

- POST /admin/events
    - Description: Admin endpoint to add events or activities to the database.
    - Use Case: Allows administrators to manage available events.
- DELETE /admin/events/[id]
    - Description: Admin endpoint to delete events or activities from the database.
    - Use Case: Ensures outdated or unwanted events are removed from available options.

## Database Schemas

- Users
    - userID (String)
    - Preferences (Array of Strings)

- Itinerary

    - tripID (String)
    - location (String)
    - date (Date)
    - description (String)
    - activities(Array of links)
    - stay (String)
    - flight (String)
