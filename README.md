# Studly Web app

Studly is a web app built to change the way students and teachers communicate with each other. We are creating a platform built for better workflow, organization and learning. 

## Set Up 
```
git clone https://github.com/ndrabins/studly-web-app.git
npm install 
npm start
```

## Schema
course-assignments/{course-key}/{assignment-key}
* assignmentTitle
* courseId
* dueDate
* description
* dateCreated
* pointValue
* attachedFiles(this may not reside in the schema but somewhere else through firebase storage)

course-announcements/{course-key}/{announcement-key}
* dateCreated
* annoucement text

courses/{course-key}/
* courseName
* courseOwnerUid
* dateCreated
* students(currently users)
* {sharedCourseNoteKey}

course-chat/{course-key}/
 * {firechat schema}
 Information on this can be found in firechat documentation
 
 users/{userId}/
 * courses/{courseId}
 * notes/{noteId}
 * assignments/{assignmentId}


### What we are building Studly with: 
* ReactJS
* Redux - state management
* Firebase - backend as a service

### Technologies: 
* Redux Thunk
* Firepad
* Firechat
* Redux Form (may end up refactoring to react-redux-form, its different I swear. Looks easier to use)
* Material UI (Were gonna switch this with custom components or something else. But its quick and easy to prototype with)
  
