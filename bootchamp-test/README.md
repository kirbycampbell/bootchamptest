cities:
[
{name: "Portland", state: "Oregon", MeetupList: [], members: [], resources: [], localTopics: []
}
];

topics: [
{
name: "TopicName", content: [{picture: "", link: "", code: "", video: ""}], city:[], tags: [], likes: 1, createdAt: July 12, 2019
}
];

{
"id": "1",
"name": "Test Topic!",
"content": {"images": "link.jpg", "code": "console.log(Date.now())", "text": "Good Luck Everybody!"},
"createdBy": "0987",
"likedBy": ["0987", "9876"]
}

format for calling user's topic query:
http://localhost:5000/api/topics/usertopics/0986
This returns a user's posts based on their user id.

Syntax for updating a patch request: http://localhost:5000/api/topics/1234
{
"name": VERY very new name biaaatch",
"likedBy": ["0986"],
"tags": ["#react"],
"cities": ["Portland, OR"],
"content": {"images": "link.jpg", "code": "console.log(Date.now())", "text": "Good Luck Everybody!"}
}
