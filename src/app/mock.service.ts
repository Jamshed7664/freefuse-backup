import { Injectable } from '@angular/core';
import { of } from 'rxjs'; 
@Injectable({
  providedIn: 'root'
})
export class MockService {

  data: any = {
    "todaysTopViewed": [
      {
          "_id": "5e95f203b79b6600070bb099",
          "url": "https://videoplyback-encoding-bucket.s3.amazonaws.com/5e846697a3e5710007bf9ed9/file_example_MOV_11920_2_2MBz/transcoded/video.m3u8",
          "watchInfo": [
              {
                  "_id": "5eb8726e8838290007d95346",
                  "videoID": "5e95f203b79b6600070bb099",
                  "userID": "5e6cdb3f214df900080d42d8",
                  "updatedAt": "2020-05-10T21:30:22.053Z",
                  "createdAt": "2020-05-10T21:30:22.053Z",
                  "__v": "0"
              },
              {
                  "_id": "5eb8fff98800ec2bf01e6b75",
                  "videoID": "5e95f203b79b6600070bb099",
                  "userID": "5e6cdb3f214df900080d42d8",
                  "updatedAt": "2020-05-11T07:41:02.509Z",
                  "createdAt": "2020-05-11T07:34:17.518Z",
                  "__v": "0"
              }
          ],
          "count": 2
      },
      {
          "_id": "5e982325c37840000856efde",
          "url": "https://videoplyback-encoding-bucket.s3.amazonaws.com/5e97f6579f2b280007ff3736/Cartoonvideo/transcoded/video.m3u8",
          "watchInfo": [
              {
                  "_id": "5eb91ef7ed4e543e60fd5dc3",
                  "videoID": "5e982325c37840000856efde",
                  "userID": "5e71bfd6b074e5000843d5b3",
                  "updatedAt": "2020-05-11T09:46:31.946Z",
                  "createdAt": "2020-05-11T09:46:31.946Z",
                  "__v": 0
              }
          ],
          "count": 1
      }
    ],
    "topViewedVideos": [
      {
          "_id": "5e95f203b79b6600070bb099",
          "thumbnail": [],
          "Categories": [],
          "Likes": [],
          "viewCount": "10",
          "shares": [],
          "comments": [],
          "user": "5e846697a3e5710007bf9ed9",
          "name": "file_example_MOV_11920_2_2MBz.mov",
          "type": "main",
          "URL": "https://videoplyback-encoding-bucket.s3.amazonaws.com/5e846697a3e5710007bf9ed9/file_example_MOV_11920_2_2MBz/transcoded/video.m3u8",
          "poster": "https://videoplyback-encoding-bucket.s3.amazonaws.com/5e846697a3e5710007bf9ed9/file_example_MOV_11920_2_2MBz/poster-00001.png",
          "parentId": "5e846697a3e5710007bf9ed9",
          "Title": "",
          "Description": "",
          "time": "7",
          "__v": "0",
          "isPublished": true,
          "publishTime": "1588927128927",
          "updatedAt": "2020-05-08T08:38:49.190Z",
          "userInfo": {
              "_id": "5e846697a3e5710007bf9ed9",
              "followers": 0,
              "following": 0,
              "role": "user",
              "isfirstlogin": false,
              "isOtpVerified": true,
              "isActive": true,
              "hasSetPassword": true,
              "profilePic": "https://video-playback-public.s3.amazonaws.com/profilepic/pgmiR0ojQQeKC4zUuijNxWjx.jpg",
              "bio": [
                  "I hope they remember you."
              ],
              "category": [
                  "Recording",
                  "Livestream"
              ],
              "includedActivities": [],
              "excludedActivities": [],
              "deleted": true,
              "firstname": "Jayant",
              "lastname": "Singh",
              "username": "jsp",
              "email": "jayant.parmar@oodlestechnologies.com",
              "hashedPassword": "$2b$10$sc7NKwnSvTRpKt.L9FxQee375j404cBvIB3W7Sl9QR6MPgLhE..OK",
              "provider": "local",
              "otp": null,
              "updatedAt": "2020-04-18T13:11:22.417Z",
              "createdAt": "2020-04-01T10:01:59.181Z",
              "__v": 0,
              "resetPasswordToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoibGtqaGdmZGN2aGprIiwiaWF0IjoxNTg2MjQ0NTk4LCJleHAiOjE1ODYyNTg5OTh9.Oht75fMmfitlOJ5ElmkIxpq5eQlEYlekP5aSTp4FBoM"
          }
      },
      {
          "_id": "5ea2121c5501390008546b0e",
          "thumbnail": [],
          "Categories": [
              "Recording",
              "Snapshot"
          ],
          "Likes": [
              "5ea41a5f936fac00071be645",
              "5ead4c1cf8db9b00073f9d76",
              "5ead9f85a57b35000732e0e6",
              "5ead9fcfa57b35000732e0ea",
              "5eb59b577b5e14000717f932"
          ],
          "shares": [],
          "comments": [
              "5ea41a40936fac00071be644",
              "5ea85b3249c2dd0007c8921e",
              "5eac7bb5f2074300081db6a9",
              "5eadbf79fa7de3000756e023",
              "5eadbf87fa7de3000756e025",
              "5eadc07efa7de3000756e028",
              "5eadc10a68ad1c00073b7fd8",
              "5eadc26168ad1c00073b7fdb",
              "5eadc2ee4d79640008aee076",
              "5eadcd0060c5e900074d0bc4",
              "5eadcd0f60c5e900074d0bc6",
              "5eae80086059450008aafae8",
              "5eb59b507b5e14000717f92d"
          ],
          "isPublished": true,
          "publishTime": "1587679992715",
          "user": "5e94a29f9889a90008f61369",
          "name": "CreatingaTCPServerinC.mp4",
          "type": "main",
          "URL": "https://videoplyback-encoding-bucket.s3.amazonaws.com/5e94a29f9889a90008f61369/CreatingaTCPServerinC/transcoded/video.m3u8",
          "poster": "https://videoplyback-encoding-bucket.s3.amazonaws.com/5e94a29f9889a90008f61369/CreatingaTCPServerinC/poster-00001.png",
          "videoID": "5e96b1f9335afc0008c919d9",
          "duration": "1050.08",
          "parentId": "5e94a29f9889a90008f61369",
          "Title": "My Fisrt Video",
          "Description": "Instagram is an American photo and video-sharing social networking service owned by Facebook, Inc. It was created by Kevin Systrom and Mike Krieger, and launched in October 2010 on iOS",
          "time": 0,
          "__v": 0,
          "updatedAt": "2020-05-09T15:54:00.369Z",
          "viewCount": 342,
          "userInfo": {
              "_id": "5e94a29f9889a90008f61369",
              "followers": [
                  {
                      "_id": "5ea9931651cad60008f7ccc3",
                      "timeStamp": "1588171542003",
                      "followedBy": "5ea7fe6dae552c000841be8d"
                  },
                  {
                      "_id": "5eac00c9d4242c00081a3cd2",
                      "timeStamp": "1588330697184",
                      "followedBy": "5ea997f951cad60008f7cccb"
                  },
                  {
                      "_id": "5eac1329b1bb320008118dd3",
                      "timeStamp": "1588335401921",
                      "followedBy": "5eac1219b1bb320008118dd0"
                  },
                  {
                      "_id": "5eac553c9daf340007f097f1",
                      "timeStamp": "1588352316380",
                      "followedBy": "5eac543e101a6400089a771e"
                  },
                  {
                      "_id": "5eb578666d5c78805b87602f",
                      "timeStamp": "1588951137374",
                      "followedBy": "5e71bfd6b074e5000843d5b3"
                  },
                  {
                      "_id": "5eb5ae9be8959b00088d6a3b",
                      "timeStamp": "1588965019248",
                      "followedBy": "5eb5adb9e8959b00088d6a38"
                  }
              ],
              "following": [
                  {
                      "timeStamp": 1587994395215,
                      "followto": "5e71bfd6b074e5000843d5b3"
                  },
                  {
                      "timeStamp": 1588334768958,
                      "followto": "5ea7fe6dae552c000841be8d"
                  },
                  {
                      "timeStamp": 1588335489735,
                      "followto": "5eac1219b1bb320008118dd0"
                  },
                  {
                      "timeStamp": 1588494328319,
                      "followto": "5e723713d43f9c0007ffad9d"
                  },
                  {
                      "timeStamp": 1588965270194,
                      "followto": "5eb5adb9e8959b00088d6a38"
                  },
                  {
                      "timeStamp": 1588965858554,
                      "followto": "5eac543e101a6400089a771e"
                  }
              ],
              "role": "user",
              "isfirstlogin": false,
              "isOtpVerified": true,
              "isActive": true,
              "hasSetPassword": true,
              "profilePic": "https://video-playback-public.s3.amazonaws.com/profilepic/jptDHVhJhO4TwwBOqnMsGc4c.jpg",
              "bio": [
                  "I am the destroyer"
              ],
              "category": [
                  "Snapshot",
                  "Recording"
              ],
              "includedActivities": [],
              "excludedActivities": [],
              "isDeactivated": false,
              "deleted": false,
              "firstname": "Glenn",
              "lastname": "Morison",
              "username": "Golem",
              "email": "corroffiqell-9038@yopmail.com",
              "hashedPassword": "$2b$10$For1fxYB7xskXoqRlNGaQOiQRRKalcPLSsPNRRR9WG3DmEQv5Jr8W",
              "provider": "local",
              "otp": null,
              "updatedAt": "2020-05-08T22:03:06.630Z",
              "createdAt": "2020-04-13T17:34:23.398Z",
              "__v": 0,
              "privacySettings": {
                  "watchHistory": true,
                  "following": true,
                  "recentConnections": true,
                  "likes": true,
                  "shares": true,
                  "viewersChoice": true,
                  "showPublicVideo": true
              },
              "notifications": {
                  "follower": true,
                  "creatorInvites": true
              }
          }
      },
      {
          "_id": "5ea1e3f58b16b10008a7f55d",
          "thumbnail": [
              "https://video-playback-public.s3.amazonaws.com/MainVideoThumbnail/c9AhiD-99WT76Ix66aXTW4EZ.png"
          ],
          "Categories": [
              "Livestream"
          ],
          "Likes": [
              "5ea9089fdb6e0c00071d1fa2"
          ],
          "shares": [],
          "comments": [
              "5ea6c88b9ba9f10008ba1922",
              "5ea6c88e9ba9f10008ba1923",
              "5ea6c8929ba9f10008ba1924",
              "5ea908d7804dfe0008a6d726",
              "5eaedaacb5078100087414af"
          ],
          "isPublished": true,
          "publishTime": "1587668634202",
          "user": "5e723713d43f9c0007ffad9d",
          "name": "test.mp4",
          "type": "main",
          "URL": "https://videoplyback-encoding-bucket.s3.amazonaws.com/5e723713d43f9c0007ffad9d/test/transcoded/video.m3u8",
          "poster": "https://videoplyback-encoding-bucket.s3.amazonaws.com/5e723713d43f9c0007ffad9d/test/poster-00001.png",
          "videoID": "5e9fd41cdff67f00081aa0f0",
          "duration": "55",
          "parentId": "5e723713d43f9c0007ffad9d",
          "Title": "this one",
          "Description": "amd teo",
          "time": 0,
          "__v": 0,
          "updatedAt": "2020-05-10T17:42:12.512Z",
          "viewCount": 170,
          "totalchild": 2,
          "totallevel": 1,
          "userInfo": {
              "_id": "5e723713d43f9c0007ffad9d",
              "followers": [
                  {
                      "_id": "5eae7ff86059450008aafae0",
                      "timeStamp": "1588494328319",
                      "followedBy": "5e94a29f9889a90008f61369"
                  }
              ],
              "following": [],
              "role": "user",
              "isfirstlogin": false,
              "isOtpVerified": true,
              "isActive": true,
              "hasSetPassword": true,
              "profilePic": "https://video-playback-public.s3.amazonaws.com/profilepic/xyZpWbUqwlxrc6UCKcFNqcbA.jpg",
              "bio": [
                  "this is test"
              ],
              "category": [
                  "Snapshot",
                  "Other",
                  "Livestream",
                  "Recording"
              ],
              "includedActivities": [],
              "excludedActivities": [],
              "deleted": false,
              "firstname": "chandan",
              "lastname": "lunthi",
              "username": "chandanlunthi",
              "email": "chandan.lunthi@oodlestechnologies.com",
              "hashedPassword": "$2b$10$PLA/DLbYiIXU7qo4ecZYh.ucAh0bePjVrdmGHFYTmz2s/6bP2xf96",
              "provider": "local",
              "otp": null,
              "updatedAt": "2020-05-03T12:48:11.813Z",
              "createdAt": "2020-03-18T14:58:28.031Z",
              "__v": 0,
              "privacySettings": {
                  "watchHistory": true
              },
              "notifications": {
                  "follower": false
              }
          }
      },
      {
          "_id": "5eadd97f2c52ce00083c96b5",
          "thumbnail": [],
          "Categories": [],
          "Likes": [
              "5eaddb802c52ce00083c96b8",
              "5eae6c2c88bd4e0008701991",
              "5eae77d96059450008aafa56"
          ],
          "shares": [],
          "comments": [
              "5eae77e76059450008aafa5e",
              "5eafb295ec3e1f0008801f4a",
              "5eb6b9e2c4404500084b07d3"
          ],
          "isPublished": true,
          "publishTime": "1588452122113",
          "viewCount": 135,
          "level": 0,
          "totallevel": 1,
          "totalchild": 2,
          "user": "5e723713d43f9c0007ffad9d",
          "name": "test.mp4",
          "type": "main",
          "URL": "https://videoplyback-encoding-bucket.s3.amazonaws.com/5e723713d43f9c0007ffad9d/test/transcoded/video.m3u8",
          "poster": "https://videoplyback-encoding-bucket.s3.amazonaws.com/5e723713d43f9c0007ffad9d/test/poster-00001.png",
          "videoID": "5e9fd41cdff67f00081aa0f0",
          "duration": "55",
          "parentId": "5e723713d43f9c0007ffad9d",
          "Title": "",
          "Description": "",
          "time": 0,
          "updatedAt": "2020-05-09T17:07:47.084Z",
          "createdAt": "2020-05-02T20:35:11.182Z",
          "__v": 0,
          "userInfo": {
              "_id": "5e723713d43f9c0007ffad9d",
              "followers": [
                  {
                      "_id": "5eae7ff86059450008aafae0",
                      "timeStamp": "1588494328319",
                      "followedBy": "5e94a29f9889a90008f61369"
                  }
              ],
              "following": [],
              "role": "user",
              "isfirstlogin": false,
              "isOtpVerified": true,
              "isActive": true,
              "hasSetPassword": true,
              "profilePic": "https://video-playback-public.s3.amazonaws.com/profilepic/xyZpWbUqwlxrc6UCKcFNqcbA.jpg",
              "bio": [
                  "this is test"
              ],
              "category": [
                  "Snapshot",
                  "Other",
                  "Livestream",
                  "Recording"
              ],
              "includedActivities": [],
              "excludedActivities": [],
              "deleted": false,
              "firstname": "chandan",
              "lastname": "lunthi",
              "username": "chandanlunthi",
              "email": "chandan.lunthi@oodlestechnologies.com",
              "hashedPassword": "$2b$10$PLA/DLbYiIXU7qo4ecZYh.ucAh0bePjVrdmGHFYTmz2s/6bP2xf96",
              "provider": "local",
              "otp": null,
              "updatedAt": "2020-05-03T12:48:11.813Z",
              "createdAt": "2020-03-18T14:58:28.031Z",
              "__v": 0,
              "privacySettings": {
                  "watchHistory": true
              },
              "notifications": {
                  "follower": false
              }
          }
      }
    ],
    "highlyInteractiveVideos": [
      {
          "_id": "5eb519bf7a21e90008d22852",
          "thumbnail": [],
          "Categories": [
              "Livestream",
              "Other"
          ],
          "Likes": [],
          "shares": [],
          "comments": [],
          "isPublished": true,
          "publishTime": "1588944614231",
          "viewCount": 37,
          "level": 0,
          "totallevel": 5,
          "totalchild": 40,
          "user": "5eb19b1e5585330007483832",
          "name": "5569",
          "type": "main",
          "URL": "https://videoplyback-encoding-bucket.s3.amazonaws.com/5eb19b1e5585330007483832/MobileAppv2/transcoded/video.m3u8",
          "poster": "https://videoplyback-encoding-bucket.s3.amazonaws.com/5eb19b1e5585330007483832/MobileAppv2/poster-00001.png",
          "videoID": "5eb5165505331e0009768c59",
          "duration": "55",
          "parentId": "5eb19b1e5585330007483832",
          "Title": "hello",
          "Description": "ok",
          "time": 10,
          "updatedAt": "2020-05-09T13:47:19.019Z",
          "createdAt": "2020-05-08T08:35:11.361Z",
          "__v": 0,
          "userInfo": {
              "_id": "5eb19b1e5585330007483832",
              "privacySettings": {
                  "watchHistory": true,
                  "following": true,
                  "recentConnections": true,
                  "likes": true,
                  "shares": true,
                  "viewersChoice": true,
                  "showPublicVideo": true
              },
              "notifications": {
                  "follower": true,
                  "followingActivity": true,
                  "commentReplies": true,
                  "likes": true,
                  "creatorInvites": true
              },
              "following": [],
              "followerCount": 0,
              "followingCount": 0,
              "role": "user",
              "isfirstlogin": false,
              "isOtpVerified": true,
              "isActive": true,
              "hasSetPassword": true,
              "profilePic": "https://video-playback-public.s3.amazonaws.com/profilepic/F8Y926ZMkHd-ccS_J084fhnD.jpeg",
              "bio": [
                  "this is kmy chandan"
              ],
              "category": [
                  "Livestream",
                  "Other"
              ],
              "includedActivities": [],
              "excludedActivities": [],
              "isDeactivated": false,
              "deleted": false,
              "firstname": "chandan",
              "lastname": "lunthi",
              "username": "chandan",
              "email": "myetsg@yopmail.com",
              "hashedPassword": "$2b$10$Up2XaWsAKdycGNVVFFfVPeJWPAAwlIkEiBJQLZbBviU59W2sOA2Za",
              "followers": [],
              "provider": "local",
              "otp": null,
              "updatedAt": "2020-05-05T16:59:50.878Z",
              "createdAt": "2020-05-05T16:58:06.792Z",
              "__v": 0
          }
      },
      {
          "_id": "5e9cec9eeca6f00007d8b7b5",
          "thumbnail": [],
          "Categories": [
              "Recording"
          ],
          "Likes": [
              "5eb168791c0f1d0008196f4a"
          ],
          "shares": [],
          "comments": [
              "5eb168161c0f1d0008196f01"
          ],
          "user": "5e6d4a0eda53b300079b0de3",
          "name": "map3.mp4",
          "type": "main",
          "URL": "https://videoplyback-encoding-bucket.s3.amazonaws.com/5e6d4a0eda53b300079b0de3/map3/transcoded/video.m3u8",
          "poster": "https://videoplyback-encoding-bucket.s3.amazonaws.com/5e6d4a0eda53b300079b0de3/map3/poster-00001.png",
          "videoID": "5e99d9762bc0e50007322ae9",
          "parentId": "5e6d4a0eda53b300079b0de3",
          "Title": "Interactive Test Map",
          "Description": "The test map is the quizzy",
          "time": 0,
          "__v": 0,
          "totalchild": 8,
          "totallevel": 3,
          "updatedAt": "2020-05-10T21:30:21.840Z",
          "isPublished": true,
          "publishTime": "1588684708467",
          "viewCount": 13,
          "userInfo": {
              "_id": "5e6d4a0eda53b300079b0de3",
              "followers": [],
              "following": [],
              "role": "user",
              "isfirstlogin": false,
              "isOtpVerified": true,
              "isActive": true,
              "hasSetPassword": true,
              "profilePic": "https://video-playback-public.s3.amazonaws.com/profilepic/C97_G7pwhmhEeeqNMJSbUsuw.jpg",
              "bio": [
                  "The worldwide leader in interactive ideas and all associated technology. Thank you for being a part of the innovation revolution! Enjoy your life"
              ],
              "category": [
                  "Recording"
              ],
              "includedActivities": [],
              "excludedActivities": [],
              "deleted": false,
              "firstname": "Michael",
              "lastname": "Liu",
              "username": "Mike The Founder",
              "email": "mike@freefuse.com",
              "hashedPassword": "$2b$10$XMIoAqsC14MYo/fTSoBgvuQ1sqwdRJUzYVm7bZmCivqBsIf5CYAcC",
              "provider": "local",
              "otp": null,
              "updatedAt": "2020-05-06T17:48:54.787Z",
              "createdAt": "2020-03-14T21:18:06.343Z",
              "__v": 0,
              "privacySettings": {
                  "likes": true,
                  "recentConnections": true,
                  "following": true,
                  "showPublicVideo": true
              }
          }
      },
      {
          "_id": "5eb6bd57c4404500084b07e2",
          "thumbnail": [],
          "Categories": [
              "Recording"
          ],
          "Likes": [],
          "shares": [],
          "comments": [],
          "isPublished": true,
          "publishTime": "1589046016545",
          "viewCount": 1,
          "level": 0,
          "totallevel": 1,
          "totalchild": 3,
          "user": "5e94a29f9889a90008f61369",
          "name": "QtWidgets-StackedWidgetAdvanced.mp4",
          "type": "main",
          "URL": "https://videoplyback-encoding-bucket.s3.amazonaws.com/5e94a29f9889a90008f61369/QtWidgets-StackedWidgetAdvanced/transcoded/video.m3u8",
          "poster": "https://videoplyback-encoding-bucket.s3.amazonaws.com/5e94a29f9889a90008f61369/QtWidgets-StackedWidgetAdvanced/poster-00001.png",
          "videoID": "5eb18328be4b4c0007ae29cc",
          "duration": "55",
          "parentId": "5e94a29f9889a90008f61369",
          "Title": "Contributor test",
          "Description": "For testing contributor functionality",
          "time": 0,
          "updatedAt": "2020-05-10T08:55:21.719Z",
          "createdAt": "2020-05-09T14:25:27.026Z",
          "__v": 0,
          "userInfo": {
              "_id": "5e94a29f9889a90008f61369",
              "followers": [
                  {
                      "_id": "5ea9931651cad60008f7ccc3",
                      "timeStamp": "1588171542003",
                      "followedBy": "5ea7fe6dae552c000841be8d"
                  },
                  {
                      "_id": "5eac00c9d4242c00081a3cd2",
                      "timeStamp": "1588330697184",
                      "followedBy": "5ea997f951cad60008f7cccb"
                  },
                  {
                      "_id": "5eac1329b1bb320008118dd3",
                      "timeStamp": "1588335401921",
                      "followedBy": "5eac1219b1bb320008118dd0"
                  },
                  {
                      "_id": "5eac553c9daf340007f097f1",
                      "timeStamp": "1588352316380",
                      "followedBy": "5eac543e101a6400089a771e"
                  },
                  {
                      "_id": "5eb578666d5c78805b87602f",
                      "timeStamp": "1588951137374",
                      "followedBy": "5e71bfd6b074e5000843d5b3"
                  },
                  {
                      "_id": "5eb5ae9be8959b00088d6a3b",
                      "timeStamp": "1588965019248",
                      "followedBy": "5eb5adb9e8959b00088d6a38"
                  }
              ],
              "following": [
                  {
                      "timeStamp": 1587994395215,
                      "followto": "5e71bfd6b074e5000843d5b3"
                  },
                  {
                      "timeStamp": 1588334768958,
                      "followto": "5ea7fe6dae552c000841be8d"
                  },
                  {
                      "timeStamp": 1588335489735,
                      "followto": "5eac1219b1bb320008118dd0"
                  },
                  {
                      "timeStamp": 1588494328319,
                      "followto": "5e723713d43f9c0007ffad9d"
                  },
                  {
                      "timeStamp": 1588965270194,
                      "followto": "5eb5adb9e8959b00088d6a38"
                  },
                  {
                      "timeStamp": 1588965858554,
                      "followto": "5eac543e101a6400089a771e"
                  }
              ],
              "role": "user",
              "isfirstlogin": false,
              "isOtpVerified": true,
              "isActive": true,
              "hasSetPassword": true,
              "profilePic": "https://video-playback-public.s3.amazonaws.com/profilepic/jptDHVhJhO4TwwBOqnMsGc4c.jpg",
              "bio": [
                  "I am the destroyer"
              ],
              "category": [
                  "Snapshot",
                  "Recording"
              ],
              "includedActivities": [],
              "excludedActivities": [],
              "isDeactivated": false,
              "deleted": false,
              "firstname": "Glenn",
              "lastname": "Morison",
              "username": "Golem",
              "email": "corroffiqell-9038@yopmail.com",
              "hashedPassword": "$2b$10$For1fxYB7xskXoqRlNGaQOiQRRKalcPLSsPNRRR9WG3DmEQv5Jr8W",
              "provider": "local",
              "otp": null,
              "updatedAt": "2020-05-08T22:03:06.630Z",
              "createdAt": "2020-04-13T17:34:23.398Z",
              "__v": 0,
              "privacySettings": {
                  "watchHistory": true,
                  "following": true,
                  "recentConnections": true,
                  "likes": true,
                  "shares": true,
                  "viewersChoice": true,
                  "showPublicVideo": true
              },
              "notifications": {
                  "follower": true,
                  "creatorInvites": true
              }
          }
      },
      {
          "_id": "5e9ceec4eca6f00007d8b7c2",
          "thumbnail": [],
          "Categories": [],
          "Likes": [
              "5eb177f89981bf0008ad33df"
          ],
          "shares": [],
          "comments": [
              "5eb179eb1c0f1d0008197071"
          ],
          "user": "5e6d4a0eda53b300079b0de3",
          "name": "Bake.mp4",
          "type": "main",
          "URL": "https://videoplyback-encoding-bucket.s3.amazonaws.com/5e6d4a0eda53b300079b0de3/Bake/transcoded/video.m3u8",
          "poster": "https://videoplyback-encoding-bucket.s3.amazonaws.com/5e6d4a0eda53b300079b0de3/Bake/poster-00001.png",
          "videoID": "5e9cee0aeca6f00007d8b7bf",
          "parentId": "5e6d4a0eda53b300079b0de3",
          "Title": "Interactive Test Map 2",
          "Description": "",
          "time": 30,
          "__v": 0,
          "totalchild": 2,
          "totallevel": 1,
          "updatedAt": "2020-05-06T21:42:16.476Z",
          "isPublished": true,
          "publishTime": "1588685487371",
          "viewCount": 10,
          "userInfo": {
              "_id": "5e6d4a0eda53b300079b0de3",
              "followers": [],
              "following": [],
              "role": "user",
              "isfirstlogin": false,
              "isOtpVerified": true,
              "isActive": true,
              "hasSetPassword": true,
              "profilePic": "https://video-playback-public.s3.amazonaws.com/profilepic/C97_G7pwhmhEeeqNMJSbUsuw.jpg",
              "bio": [
                  "The worldwide leader in interactive ideas and all associated technology. Thank you for being a part of the innovation revolution! Enjoy your life"
              ],
              "category": [
                  "Recording"
              ],
              "includedActivities": [],
              "excludedActivities": [],
              "deleted": false,
              "firstname": "Michael",
              "lastname": "Liu",
              "username": "Mike The Founder",
              "email": "mike@freefuse.com",
              "hashedPassword": "$2b$10$XMIoAqsC14MYo/fTSoBgvuQ1sqwdRJUzYVm7bZmCivqBsIf5CYAcC",
              "provider": "local",
              "otp": null,
              "updatedAt": "2020-05-06T17:48:54.787Z",
              "createdAt": "2020-03-14T21:18:06.343Z",
              "__v": 0,
              "privacySettings": {
                  "likes": true,
                  "recentConnections": true,
                  "following": true,
                  "showPublicVideo": true
              }
          }
      },
      {
          "_id": "5e9cf281eca6f00007d8b7cd",
          "thumbnail": [
              "https://video-playback-public.s3.amazonaws.com/MainVideoThumbnail/mUB9gYgZ5QL064ykjtchzQjf.jpg"
          ],
          "Categories": [
              "Recording"
          ],
          "Likes": [],
          "shares": [],
          "comments": [],
          "user": "5e6d4a0eda53b300079b0de3",
          "name": "Example 1",
          "type": "main",
          "URL": "https://videoplyback-encoding-bucket.s3.amazonaws.com/5e6d4a0eda53b300079b0de3/map1_1/transcoded/video.m3u8",
          "poster": "https://videoplyback-encoding-bucket.s3.amazonaws.com/5e6d4a0eda53b300079b0de3/map1_1/poster-00001.png",
          "videoID": "5e99d81868b88b000817f317",
          "parentId": "5e6d4a0eda53b300079b0de3",
          "Title": "Example Data Collection",
          "Description": "Example Data Collection. #Doubleup",
          "time": 5,
          "__v": 0,
          "updatedAt": "2020-05-08T01:00:40.897Z",
          "totalchild": 2,
          "totallevel": 1,
          "isPublished": true,
          "publishTime": "1588899640895",
          "userInfo": {
              "_id": "5e6d4a0eda53b300079b0de3",
              "followers": [],
              "following": [],
              "role": "user",
              "isfirstlogin": false,
              "isOtpVerified": true,
              "isActive": true,
              "hasSetPassword": true,
              "profilePic": "https://video-playback-public.s3.amazonaws.com/profilepic/C97_G7pwhmhEeeqNMJSbUsuw.jpg",
              "bio": [
                  "The worldwide leader in interactive ideas and all associated technology. Thank you for being a part of the innovation revolution! Enjoy your life"
              ],
              "category": [
                  "Recording"
              ],
              "includedActivities": [],
              "excludedActivities": [],
              "deleted": false,
              "firstname": "Michael",
              "lastname": "Liu",
              "username": "Mike The Founder",
              "email": "mike@freefuse.com",
              "hashedPassword": "$2b$10$XMIoAqsC14MYo/fTSoBgvuQ1sqwdRJUzYVm7bZmCivqBsIf5CYAcC",
              "provider": "local",
              "otp": null,
              "updatedAt": "2020-05-06T17:48:54.787Z",
              "createdAt": "2020-03-14T21:18:06.343Z",
              "__v": 0,
              "privacySettings": {
                  "likes": true,
                  "recentConnections": true,
                  "following": true,
                  "showPublicVideo": true
              }
          }
      }
    ],
    "popularCreators": [
      {
          "_id": "5eb527cca866160008193184",
          "thumbnail": [],
          "Categories": [
              "Recording",
              "Snapshot"
          ],
          "Likes": [
              "5eb5af1367fe680008a4ffaf"
          ],
          "shares": [],
          "comments": [
              "5eb5af2e67fe680008a4ffbc",
              "5eb8397f32e02100085a90b4"
          ],
          "isPublished": true,
          "publishTime": "1588930670360",
          "viewCount": 2,
          "level": 0,
          "totallevel": 1,
          "totalchild": 2,
          "user": "5e94a29f9889a90008f61369",
          "name": "QtWidgets-StackedWidgetAdvanced.mp4",
          "type": "main",
          "URL": "https://videoplyback-encoding-bucket.s3.amazonaws.com/5e94a29f9889a90008f61369/QtWidgets-StackedWidgetAdvanced/transcoded/video.m3u8",
          "poster": "https://videoplyback-encoding-bucket.s3.amazonaws.com/5e94a29f9889a90008f61369/QtWidgets-StackedWidgetAdvanced/poster-00001.png",
          "videoID": "5eb18328be4b4c0007ae29cc",
          "duration": "55",
          "parentId": "5e94a29f9889a90008f61369",
          "Title": "Test interactive video",
          "Description": "Just created for testing",
          "time": 0,
          "updatedAt": "2020-05-10T17:27:27.088Z",
          "createdAt": "2020-05-08T09:35:08.614Z",
          "__v": 0,
          "userInfo": {
              "_id": "5e94a29f9889a90008f61369",
              "followers": [
                  {
                      "_id": "5ea9931651cad60008f7ccc3",
                      "timeStamp": "1588171542003",
                      "followedBy": "5ea7fe6dae552c000841be8d"
                  },
                  {
                      "_id": "5eac00c9d4242c00081a3cd2",
                      "timeStamp": "1588330697184",
                      "followedBy": "5ea997f951cad60008f7cccb"
                  },
                  {
                      "_id": "5eac1329b1bb320008118dd3",
                      "timeStamp": "1588335401921",
                      "followedBy": "5eac1219b1bb320008118dd0"
                  },
                  {
                      "_id": "5eac553c9daf340007f097f1",
                      "timeStamp": "1588352316380",
                      "followedBy": "5eac543e101a6400089a771e"
                  },
                  {
                      "_id": "5eb578666d5c78805b87602f",
                      "timeStamp": "1588951137374",
                      "followedBy": "5e71bfd6b074e5000843d5b3"
                  },
                  {
                      "_id": "5eb5ae9be8959b00088d6a3b",
                      "timeStamp": "1588965019248",
                      "followedBy": "5eb5adb9e8959b00088d6a38"
                  }
              ],
              "following": [
                  {
                      "timeStamp": 1587994395215,
                      "followto": "5e71bfd6b074e5000843d5b3"
                  },
                  {
                      "timeStamp": 1588334768958,
                      "followto": "5ea7fe6dae552c000841be8d"
                  },
                  {
                      "timeStamp": 1588335489735,
                      "followto": "5eac1219b1bb320008118dd0"
                  },
                  {
                      "timeStamp": 1588494328319,
                      "followto": "5e723713d43f9c0007ffad9d"
                  },
                  {
                      "timeStamp": 1588965270194,
                      "followto": "5eb5adb9e8959b00088d6a38"
                  },
                  {
                      "timeStamp": 1588965858554,
                      "followto": "5eac543e101a6400089a771e"
                  }
              ],
              "role": "user",
              "isfirstlogin": false,
              "isOtpVerified": true,
              "isActive": true,
              "hasSetPassword": true,
              "profilePic": "https://video-playback-public.s3.amazonaws.com/profilepic/jptDHVhJhO4TwwBOqnMsGc4c.jpg",
              "bio": [
                  "I am the destroyer"
              ],
              "category": [
                  "Snapshot",
                  "Recording"
              ],
              "includedActivities": [],
              "excludedActivities": [],
              "isDeactivated": false,
              "deleted": false,
              "firstname": "Glenn",
              "lastname": "Morison",
              "username": "Golem",
              "email": "corroffiqell-9038@yopmail.com",
              "hashedPassword": "$2b$10$For1fxYB7xskXoqRlNGaQOiQRRKalcPLSsPNRRR9WG3DmEQv5Jr8W",
              "provider": "local",
              "otp": null,
              "updatedAt": "2020-05-08T22:03:06.630Z",
              "createdAt": "2020-04-13T17:34:23.398Z",
              "__v": 0,
              "privacySettings": {
                  "watchHistory": true,
                  "following": true,
                  "recentConnections": true,
                  "likes": true,
                  "shares": true,
                  "viewersChoice": true,
                  "showPublicVideo": true
              },
              "notifications": {
                  "follower": true,
                  "creatorInvites": true
              }
          }
      },
      {
          "_id": "5eb16df31c0f1d0008196fcc",
          "thumbnail": [],
          "Categories": [
              "Recording"
          ],
          "Likes": [
              "5eb16fa91c0f1d0008197029",
              "5eb56618f3bf43000847ce28"
          ],
          "shares": [],
          "comments": [
              "5eb553a1c73811000713105a",
              "5eb565edf3bf43000847ce00",
              "5eb5b25ce8959b00088d6a4a"
          ],
          "isPublished": true,
          "publishTime": "1588686434588",
          "viewCount": 23,
          "level": 0,
          "totallevel": 1,
          "totalchild": 2,
          "user": "5e94a29f9889a90008f61369",
          "name": "ACECOMBAT™7_SKIESUNKNOWN2020-04-2619-50-27.mp4",
          "type": "main",
          "URL": "https://videoplyback-encoding-bucket.s3.amazonaws.com/5e94a29f9889a90008f61369/ACECOMBAT™7_SKIESUNKNOWN2020-04-2619-50-27/transcoded/video.m3u8",
          "poster": "https://videoplyback-encoding-bucket.s3.amazonaws.com/5e94a29f9889a90008f61369/ACECOMBAT™7_SKIESUNKNOWN2020-04-2619-50-27/poster-00001.png",
          "videoID": "5eb167fc9981bf0008ad336e",
          "duration": "55",
          "parentId": "5e94a29f9889a90008f61369",
          "Title": "Ace Combat",
          "Description": "This is a simple replay of mission 11 the fleet destruction",
          "time": 0,
          "updatedAt": "2020-05-08T19:39:24.176Z",
          "createdAt": "2020-05-05T13:45:23.274Z",
          "__v": 0,
          "userInfo": {
              "_id": "5e94a29f9889a90008f61369",
              "followers": [
                  {
                      "_id": "5ea9931651cad60008f7ccc3",
                      "timeStamp": "1588171542003",
                      "followedBy": "5ea7fe6dae552c000841be8d"
                  },
                  {
                      "_id": "5eac00c9d4242c00081a3cd2",
                      "timeStamp": "1588330697184",
                      "followedBy": "5ea997f951cad60008f7cccb"
                  },
                  {
                      "_id": "5eac1329b1bb320008118dd3",
                      "timeStamp": "1588335401921",
                      "followedBy": "5eac1219b1bb320008118dd0"
                  },
                  {
                      "_id": "5eac553c9daf340007f097f1",
                      "timeStamp": "1588352316380",
                      "followedBy": "5eac543e101a6400089a771e"
                  },
                  {
                      "_id": "5eb578666d5c78805b87602f",
                      "timeStamp": "1588951137374",
                      "followedBy": "5e71bfd6b074e5000843d5b3"
                  },
                  {
                      "_id": "5eb5ae9be8959b00088d6a3b",
                      "timeStamp": "1588965019248",
                      "followedBy": "5eb5adb9e8959b00088d6a38"
                  }
              ],
              "following": [
                  {
                      "timeStamp": 1587994395215,
                      "followto": "5e71bfd6b074e5000843d5b3"
                  },
                  {
                      "timeStamp": 1588334768958,
                      "followto": "5ea7fe6dae552c000841be8d"
                  },
                  {
                      "timeStamp": 1588335489735,
                      "followto": "5eac1219b1bb320008118dd0"
                  },
                  {
                      "timeStamp": 1588494328319,
                      "followto": "5e723713d43f9c0007ffad9d"
                  },
                  {
                      "timeStamp": 1588965270194,
                      "followto": "5eb5adb9e8959b00088d6a38"
                  },
                  {
                      "timeStamp": 1588965858554,
                      "followto": "5eac543e101a6400089a771e"
                  }
              ],
              "role": "user",
              "isfirstlogin": false,
              "isOtpVerified": true,
              "isActive": true,
              "hasSetPassword": true,
              "profilePic": "https://video-playback-public.s3.amazonaws.com/profilepic/jptDHVhJhO4TwwBOqnMsGc4c.jpg",
              "bio": [
                  "I am the destroyer"
              ],
              "category": [
                  "Snapshot",
                  "Recording"
              ],
              "includedActivities": [],
              "excludedActivities": [],
              "isDeactivated": false,
              "deleted": false,
              "firstname": "Glenn",
              "lastname": "Morison",
              "username": "Golem",
              "email": "corroffiqell-9038@yopmail.com",
              "hashedPassword": "$2b$10$For1fxYB7xskXoqRlNGaQOiQRRKalcPLSsPNRRR9WG3DmEQv5Jr8W",
              "provider": "local",
              "otp": null,
              "updatedAt": "2020-05-08T22:03:06.630Z",
              "createdAt": "2020-04-13T17:34:23.398Z",
              "__v": 0,
              "privacySettings": {
                  "watchHistory": true,
                  "following": true,
                  "recentConnections": true,
                  "likes": true,
                  "shares": true,
                  "viewersChoice": true,
                  "showPublicVideo": true
              },
              "notifications": {
                  "follower": true,
                  "creatorInvites": true
              }
          }
      },
      {
          "_id": "5ea2121c5501390008546b0e",
          "thumbnail": [],
          "Categories": [
              "Recording",
              "Snapshot"
          ],
          "Likes": [
              "5ea41a5f936fac00071be645",
              "5ead4c1cf8db9b00073f9d76",
              "5ead9f85a57b35000732e0e6",
              "5ead9fcfa57b35000732e0ea",
              "5eb59b577b5e14000717f932"
          ],
          "shares": [],
          "comments": [
              "5ea41a40936fac00071be644",
              "5ea85b3249c2dd0007c8921e",
              "5eac7bb5f2074300081db6a9",
              "5eadbf79fa7de3000756e023",
              "5eadbf87fa7de3000756e025",
              "5eadc07efa7de3000756e028",
              "5eadc10a68ad1c00073b7fd8",
              "5eadc26168ad1c00073b7fdb",
              "5eadc2ee4d79640008aee076",
              "5eadcd0060c5e900074d0bc4",
              "5eadcd0f60c5e900074d0bc6",
              "5eae80086059450008aafae8",
              "5eb59b507b5e14000717f92d"
          ],
          "isPublished": true,
          "publishTime": "1587679992715",
          "user": "5e94a29f9889a90008f61369",
          "name": "CreatingaTCPServerinC.mp4",
          "type": "main",
          "URL": "https://videoplyback-encoding-bucket.s3.amazonaws.com/5e94a29f9889a90008f61369/CreatingaTCPServerinC/transcoded/video.m3u8",
          "poster": "https://videoplyback-encoding-bucket.s3.amazonaws.com/5e94a29f9889a90008f61369/CreatingaTCPServerinC/poster-00001.png",
          "videoID": "5e96b1f9335afc0008c919d9",
          "duration": "1050.08",
          "parentId": "5e94a29f9889a90008f61369",
          "Title": "My Fisrt Video",
          "Description": "Instagram is an American photo and video-sharing social networking service owned by Facebook, Inc. It was created by Kevin Systrom and Mike Krieger, and launched in October 2010 on iOS",
          "time": 0,
          "__v": 0,
          "updatedAt": "2020-05-09T15:54:00.369Z",
          "viewCount": 342,
          "userInfo": {
              "_id": "5e94a29f9889a90008f61369",
              "followers": [
                  {
                      "_id": "5ea9931651cad60008f7ccc3",
                      "timeStamp": "1588171542003",
                      "followedBy": "5ea7fe6dae552c000841be8d"
                  },
                  {
                      "_id": "5eac00c9d4242c00081a3cd2",
                      "timeStamp": "1588330697184",
                      "followedBy": "5ea997f951cad60008f7cccb"
                  },
                  {
                      "_id": "5eac1329b1bb320008118dd3",
                      "timeStamp": "1588335401921",
                      "followedBy": "5eac1219b1bb320008118dd0"
                  },
                  {
                      "_id": "5eac553c9daf340007f097f1",
                      "timeStamp": "1588352316380",
                      "followedBy": "5eac543e101a6400089a771e"
                  },
                  {
                      "_id": "5eb578666d5c78805b87602f",
                      "timeStamp": "1588951137374",
                      "followedBy": "5e71bfd6b074e5000843d5b3"
                  },
                  {
                      "_id": "5eb5ae9be8959b00088d6a3b",
                      "timeStamp": "1588965019248",
                      "followedBy": "5eb5adb9e8959b00088d6a38"
                  }
              ],
              "following": [
                  {
                      "timeStamp": 1587994395215,
                      "followto": "5e71bfd6b074e5000843d5b3"
                  },
                  {
                      "timeStamp": 1588334768958,
                      "followto": "5ea7fe6dae552c000841be8d"
                  },
                  {
                      "timeStamp": 1588335489735,
                      "followto": "5eac1219b1bb320008118dd0"
                  },
                  {
                      "timeStamp": 1588494328319,
                      "followto": "5e723713d43f9c0007ffad9d"
                  },
                  {
                      "timeStamp": 1588965270194,
                      "followto": "5eb5adb9e8959b00088d6a38"
                  },
                  {
                      "timeStamp": 1588965858554,
                      "followto": "5eac543e101a6400089a771e"
                  }
              ],
              "role": "user",
              "isfirstlogin": false,
              "isOtpVerified": true,
              "isActive": true,
              "hasSetPassword": true,
              "profilePic": "https://video-playback-public.s3.amazonaws.com/profilepic/jptDHVhJhO4TwwBOqnMsGc4c.jpg",
              "bio": [
                  "I am the destroyer"
              ],
              "category": [
                  "Snapshot",
                  "Recording"
              ],
              "includedActivities": [],
              "excludedActivities": [],
              "isDeactivated": false,
              "deleted": false,
              "firstname": "Glenn",
              "lastname": "Morison",
              "username": "Golem",
              "email": "corroffiqell-9038@yopmail.com",
              "hashedPassword": "$2b$10$For1fxYB7xskXoqRlNGaQOiQRRKalcPLSsPNRRR9WG3DmEQv5Jr8W",
              "provider": "local",
              "otp": null,
              "updatedAt": "2020-05-08T22:03:06.630Z",
              "createdAt": "2020-04-13T17:34:23.398Z",
              "__v": 0,
              "privacySettings": {
                  "watchHistory": true,
                  "following": true,
                  "recentConnections": true,
                  "likes": true,
                  "shares": true,
                  "viewersChoice": true,
                  "showPublicVideo": true
              },
              "notifications": {
                  "follower": true,
                  "creatorInvites": true
              }
          }
      }
    ],
    "recommendedVideos": [
      {
          "_id": "5eb519bf7a21e90008d22852",
          "thumbnail": [],
          "Categories": [
              "Livestream",
              "Other"
          ],
          "Likes": [],
          "shares": [],
          "comments": [],
          "isPublished": true,
          "publishTime": "1588944614231",
          "viewCount": 37,
          "level": 0,
          "totallevel": 5,
          "totalchild": 40,
          "user": "5eb19b1e5585330007483832",
          "name": "5569",
          "type": "main",
          "URL": "https://videoplyback-encoding-bucket.s3.amazonaws.com/5eb19b1e5585330007483832/MobileAppv2/transcoded/video.m3u8",
          "poster": "https://videoplyback-encoding-bucket.s3.amazonaws.com/5eb19b1e5585330007483832/MobileAppv2/poster-00001.png",
          "videoID": "5eb5165505331e0009768c59",
          "duration": "55",
          "parentId": "5eb19b1e5585330007483832",
          "Title": "hello",
          "Description": "ok",
          "time": 10,
          "updatedAt": "2020-05-09T13:47:19.019Z",
          "createdAt": "2020-05-08T08:35:11.361Z",
          "__v": 0,
          "userInfo": {
              "_id": "5eb19b1e5585330007483832",
              "privacySettings": {
                  "watchHistory": true,
                  "following": true,
                  "recentConnections": true,
                  "likes": true,
                  "shares": true,
                  "viewersChoice": true,
                  "showPublicVideo": true
              },
              "notifications": {
                  "follower": true,
                  "followingActivity": true,
                  "commentReplies": true,
                  "likes": true,
                  "creatorInvites": true
              },
              "following": [],
              "followerCount": 0,
              "followingCount": 0,
              "role": "user",
              "isfirstlogin": false,
              "isOtpVerified": true,
              "isActive": true,
              "hasSetPassword": true,
              "profilePic": "https://video-playback-public.s3.amazonaws.com/profilepic/F8Y926ZMkHd-ccS_J084fhnD.jpeg",
              "bio": [
                  "this is kmy chandan"
              ],
              "category": [
                  "Livestream",
                  "Other"
              ],
              "includedActivities": [],
              "excludedActivities": [],
              "isDeactivated": false,
              "deleted": false,
              "firstname": "chandan",
              "lastname": "lunthi",
              "username": "chandan",
              "email": "myetsg@yopmail.com",
              "hashedPassword": "$2b$10$Up2XaWsAKdycGNVVFFfVPeJWPAAwlIkEiBJQLZbBviU59W2sOA2Za",
              "followers": [],
              "provider": "local",
              "otp": null,
              "updatedAt": "2020-05-05T16:59:50.878Z",
              "createdAt": "2020-05-05T16:58:06.792Z",
              "__v": 0
          }
      },
      {
          "_id": "5e9cec9eeca6f00007d8b7b5",
          "thumbnail": [],
          "Categories": [
              "Recording"
          ],
          "Likes": [
              "5eb168791c0f1d0008196f4a"
          ],
          "shares": [],
          "comments": [
              "5eb168161c0f1d0008196f01"
          ],
          "user": "5e6d4a0eda53b300079b0de3",
          "name": "map3.mp4",
          "type": "main",
          "URL": "https://videoplyback-encoding-bucket.s3.amazonaws.com/5e6d4a0eda53b300079b0de3/map3/transcoded/video.m3u8",
          "poster": "https://videoplyback-encoding-bucket.s3.amazonaws.com/5e6d4a0eda53b300079b0de3/map3/poster-00001.png",
          "videoID": "5e99d9762bc0e50007322ae9",
          "parentId": "5e6d4a0eda53b300079b0de3",
          "Title": "Interactive Test Map",
          "Description": "The test map is the quizzy",
          "time": 0,
          "__v": 0,
          "totalchild": 8,
          "totallevel": 3,
          "updatedAt": "2020-05-10T21:30:21.840Z",
          "isPublished": true,
          "publishTime": "1588684708467",
          "viewCount": 13,
          "userInfo": {
              "_id": "5e6d4a0eda53b300079b0de3",
              "followers": [],
              "following": [],
              "role": "user",
              "isfirstlogin": false,
              "isOtpVerified": true,
              "isActive": true,
              "hasSetPassword": true,
              "profilePic": "https://video-playback-public.s3.amazonaws.com/profilepic/C97_G7pwhmhEeeqNMJSbUsuw.jpg",
              "bio": [
                  "The worldwide leader in interactive ideas and all associated technology. Thank you for being a part of the innovation revolution! Enjoy your life"
              ],
              "category": [
                  "Recording"
              ],
              "includedActivities": [],
              "excludedActivities": [],
              "deleted": false,
              "firstname": "Michael",
              "lastname": "Liu",
              "username": "Mike The Founder",
              "email": "mike@freefuse.com",
              "hashedPassword": "$2b$10$XMIoAqsC14MYo/fTSoBgvuQ1sqwdRJUzYVm7bZmCivqBsIf5CYAcC",
              "provider": "local",
              "otp": null,
              "updatedAt": "2020-05-06T17:48:54.787Z",
              "createdAt": "2020-03-14T21:18:06.343Z",
              "__v": 0,
              "privacySettings": {
                  "likes": true,
                  "recentConnections": true,
                  "following": true,
                  "showPublicVideo": true
              }
          }
      },
      {
          "_id": "5eb6bd57c4404500084b07e2",
          "thumbnail": [],
          "Categories": [
              "Recording"
          ],
          "Likes": [],
          "shares": [],
          "comments": [],
          "isPublished": true,
          "publishTime": "1589046016545",
          "viewCount": 1,
          "level": 0,
          "totallevel": 1,
          "totalchild": 3,
          "user": "5e94a29f9889a90008f61369",
          "name": "QtWidgets-StackedWidgetAdvanced.mp4",
          "type": "main",
          "URL": "https://videoplyback-encoding-bucket.s3.amazonaws.com/5e94a29f9889a90008f61369/QtWidgets-StackedWidgetAdvanced/transcoded/video.m3u8",
          "poster": "https://videoplyback-encoding-bucket.s3.amazonaws.com/5e94a29f9889a90008f61369/QtWidgets-StackedWidgetAdvanced/poster-00001.png",
          "videoID": "5eb18328be4b4c0007ae29cc",
          "duration": "55",
          "parentId": "5e94a29f9889a90008f61369",
          "Title": "Contributor test",
          "Description": "For testing contributor functionality",
          "time": 0,
          "updatedAt": "2020-05-10T08:55:21.719Z",
          "createdAt": "2020-05-09T14:25:27.026Z",
          "__v": 0,
          "userInfo": {
              "_id": "5e94a29f9889a90008f61369",
              "followers": [
                  {
                      "_id": "5ea9931651cad60008f7ccc3",
                      "timeStamp": "1588171542003",
                      "followedBy": "5ea7fe6dae552c000841be8d"
                  },
                  {
                      "_id": "5eac00c9d4242c00081a3cd2",
                      "timeStamp": "1588330697184",
                      "followedBy": "5ea997f951cad60008f7cccb"
                  },
                  {
                      "_id": "5eac1329b1bb320008118dd3",
                      "timeStamp": "1588335401921",
                      "followedBy": "5eac1219b1bb320008118dd0"
                  },
                  {
                      "_id": "5eac553c9daf340007f097f1",
                      "timeStamp": "1588352316380",
                      "followedBy": "5eac543e101a6400089a771e"
                  },
                  {
                      "_id": "5eb578666d5c78805b87602f",
                      "timeStamp": "1588951137374",
                      "followedBy": "5e71bfd6b074e5000843d5b3"
                  },
                  {
                      "_id": "5eb5ae9be8959b00088d6a3b",
                      "timeStamp": "1588965019248",
                      "followedBy": "5eb5adb9e8959b00088d6a38"
                  }
              ],
              "following": [
                  {
                      "timeStamp": 1587994395215,
                      "followto": "5e71bfd6b074e5000843d5b3"
                  },
                  {
                      "timeStamp": 1588334768958,
                      "followto": "5ea7fe6dae552c000841be8d"
                  },
                  {
                      "timeStamp": 1588335489735,
                      "followto": "5eac1219b1bb320008118dd0"
                  },
                  {
                      "timeStamp": 1588494328319,
                      "followto": "5e723713d43f9c0007ffad9d"
                  },
                  {
                      "timeStamp": 1588965270194,
                      "followto": "5eb5adb9e8959b00088d6a38"
                  },
                  {
                      "timeStamp": 1588965858554,
                      "followto": "5eac543e101a6400089a771e"
                  }
              ],
              "role": "user",
              "isfirstlogin": false,
              "isOtpVerified": true,
              "isActive": true,
              "hasSetPassword": true,
              "profilePic": "https://video-playback-public.s3.amazonaws.com/profilepic/jptDHVhJhO4TwwBOqnMsGc4c.jpg",
              "bio": [
                  "I am the destroyer"
              ],
              "category": [
                  "Snapshot",
                  "Recording"
              ],
              "includedActivities": [],
              "excludedActivities": [],
              "isDeactivated": false,
              "deleted": false,
              "firstname": "Glenn",
              "lastname": "Morison",
              "username": "Golem",
              "email": "corroffiqell-9038@yopmail.com",
              "hashedPassword": "$2b$10$For1fxYB7xskXoqRlNGaQOiQRRKalcPLSsPNRRR9WG3DmEQv5Jr8W",
              "provider": "local",
              "otp": null,
              "updatedAt": "2020-05-08T22:03:06.630Z",
              "createdAt": "2020-04-13T17:34:23.398Z",
              "__v": 0,
              "privacySettings": {
                  "watchHistory": true,
                  "following": true,
                  "recentConnections": true,
                  "likes": true,
                  "shares": true,
                  "viewersChoice": true,
                  "showPublicVideo": true
              },
              "notifications": {
                  "follower": true,
                  "creatorInvites": true
              }
          }
      },
      {
          "_id": "5ea1e3f58b16b10008a7f55d",
          "thumbnail": [
              "https://video-playback-public.s3.amazonaws.com/MainVideoThumbnail/c9AhiD-99WT76Ix66aXTW4EZ.png"
          ],
          "Categories": [
              "Livestream"
          ],
          "Likes": [
              "5ea9089fdb6e0c00071d1fa2"
          ],
          "shares": [],
          "comments": [
              "5ea6c88b9ba9f10008ba1922",
              "5ea6c88e9ba9f10008ba1923",
              "5ea6c8929ba9f10008ba1924",
              "5ea908d7804dfe0008a6d726",
              "5eaedaacb5078100087414af"
          ],
          "isPublished": true,
          "publishTime": "1587668634202",
          "user": "5e723713d43f9c0007ffad9d",
          "name": "test.mp4",
          "type": "main",
          "URL": "https://videoplyback-encoding-bucket.s3.amazonaws.com/5e723713d43f9c0007ffad9d/test/transcoded/video.m3u8",
          "poster": "https://videoplyback-encoding-bucket.s3.amazonaws.com/5e723713d43f9c0007ffad9d/test/poster-00001.png",
          "videoID": "5e9fd41cdff67f00081aa0f0",
          "duration": "55",
          "parentId": "5e723713d43f9c0007ffad9d",
          "Title": "this one",
          "Description": "amd teo",
          "time": 0,
          "__v": 0,
          "updatedAt": "2020-05-10T17:42:12.512Z",
          "viewCount": 170,
          "totalchild": 2,
          "totallevel": 1,
          "userInfo": {
              "_id": "5e723713d43f9c0007ffad9d",
              "followers": [
                  {
                      "_id": "5eae7ff86059450008aafae0",
                      "timeStamp": "1588494328319",
                      "followedBy": "5e94a29f9889a90008f61369"
                  }
              ],
              "following": [],
              "role": "user",
              "isfirstlogin": false,
              "isOtpVerified": true,
              "isActive": true,
              "hasSetPassword": true,
              "profilePic": "https://video-playback-public.s3.amazonaws.com/profilepic/xyZpWbUqwlxrc6UCKcFNqcbA.jpg",
              "bio": [
                  "this is test"
              ],
              "category": [
                  "Snapshot",
                  "Other",
                  "Livestream",
                  "Recording"
              ],
              "includedActivities": [],
              "excludedActivities": [],
              "deleted": false,
              "firstname": "chandan",
              "lastname": "lunthi",
              "username": "chandanlunthi",
              "email": "chandan.lunthi@oodlestechnologies.com",
              "hashedPassword": "$2b$10$PLA/DLbYiIXU7qo4ecZYh.ucAh0bePjVrdmGHFYTmz2s/6bP2xf96",
              "provider": "local",
              "otp": null,
              "updatedAt": "2020-05-03T12:48:11.813Z",
              "createdAt": "2020-03-18T14:58:28.031Z",
              "__v": 0,
              "privacySettings": {
                  "watchHistory": true
              },
              "notifications": {
                  "follower": false
              }
          }
      },
      {
          "_id": "5eadd97f2c52ce00083c96b5",
          "thumbnail": [],
          "Categories": [],
          "Likes": [
              "5eaddb802c52ce00083c96b8",
              "5eae6c2c88bd4e0008701991",
              "5eae77d96059450008aafa56"
          ],
          "shares": [],
          "comments": [
              "5eae77e76059450008aafa5e",
              "5eafb295ec3e1f0008801f4a",
              "5eb6b9e2c4404500084b07d3"
          ],
          "isPublished": true,
          "publishTime": "1588452122113",
          "viewCount": 135,
          "level": 0,
          "totallevel": 1,
          "totalchild": 2,
          "user": "5e723713d43f9c0007ffad9d",
          "name": "test.mp4",
          "type": "main",
          "URL": "https://videoplyback-encoding-bucket.s3.amazonaws.com/5e723713d43f9c0007ffad9d/test/transcoded/video.m3u8",
          "poster": "https://videoplyback-encoding-bucket.s3.amazonaws.com/5e723713d43f9c0007ffad9d/test/poster-00001.png",
          "videoID": "5e9fd41cdff67f00081aa0f0",
          "duration": "55",
          "parentId": "5e723713d43f9c0007ffad9d",
          "Title": "",
          "Description": "",
          "time": 0,
          "updatedAt": "2020-05-09T17:07:47.084Z",
          "createdAt": "2020-05-02T20:35:11.182Z",
          "__v": 0,
          "userInfo": {
              "_id": "5e723713d43f9c0007ffad9d",
              "followers": [
                  {
                      "_id": "5eae7ff86059450008aafae0",
                      "timeStamp": "1588494328319",
                      "followedBy": "5e94a29f9889a90008f61369"
                  }
              ],
              "following": [],
              "role": "user",
              "isfirstlogin": false,
              "isOtpVerified": true,
              "isActive": true,
              "hasSetPassword": true,
              "profilePic": "https://video-playback-public.s3.amazonaws.com/profilepic/xyZpWbUqwlxrc6UCKcFNqcbA.jpg",
              "bio": [
                  "this is test"
              ],
              "category": [
                  "Snapshot",
                  "Other",
                  "Livestream",
                  "Recording"
              ],
              "includedActivities": [],
              "excludedActivities": [],
              "deleted": false,
              "firstname": "chandan",
              "lastname": "lunthi",
              "username": "chandanlunthi",
              "email": "chandan.lunthi@oodlestechnologies.com",
              "hashedPassword": "$2b$10$PLA/DLbYiIXU7qo4ecZYh.ucAh0bePjVrdmGHFYTmz2s/6bP2xf96",
              "provider": "local",
              "otp": null,
              "updatedAt": "2020-05-03T12:48:11.813Z",
              "createdAt": "2020-03-18T14:58:28.031Z",
              "__v": 0,
              "privacySettings": {
                  "watchHistory": true
              },
              "notifications": {
                  "follower": false
              }
          }
      },
      {
          "_id": "5eafb44dec3e1f0008801fac",
          "thumbnail": [],
          "Categories": [
              "Other",
              "Recording"
          ],
          "Likes": [
              "5eb70699cece3500079af387"
          ],
          "shares": [],
          "comments": [
              "5eb06ba8ca94ba00073e82bc",
              "5eb06bc044140300087413f9"
          ],
          "isPublished": true,
          "publishTime": "1588615169463",
          "viewCount": 52,
          "level": 0,
          "totallevel": 1,
          "totalchild": 2,
          "user": "5e723713d43f9c0007ffad9d",
          "name": "test.mp4",
          "type": "main",
          "URL": "https://videoplyback-encoding-bucket.s3.amazonaws.com/5e723713d43f9c0007ffad9d/test/transcoded/video.m3u8",
          "poster": "https://videoplyback-encoding-bucket.s3.amazonaws.com/5e723713d43f9c0007ffad9d/test/poster-00001.png",
          "videoID": "5e9fd41cdff67f00081aa0f0",
          "duration": "55",
          "parentId": "5e723713d43f9c0007ffad9d",
          "Title": "ok",
          "Description": "okjknkmkmkmk",
          "time": 0,
          "updatedAt": "2020-05-09T19:45:41.935Z",
          "createdAt": "2020-05-04T06:21:01.084Z",
          "__v": 0,
          "userInfo": {
              "_id": "5e723713d43f9c0007ffad9d",
              "followers": [
                  {
                      "_id": "5eae7ff86059450008aafae0",
                      "timeStamp": "1588494328319",
                      "followedBy": "5e94a29f9889a90008f61369"
                  }
              ],
              "following": [],
              "role": "user",
              "isfirstlogin": false,
              "isOtpVerified": true,
              "isActive": true,
              "hasSetPassword": true,
              "profilePic": "https://video-playback-public.s3.amazonaws.com/profilepic/xyZpWbUqwlxrc6UCKcFNqcbA.jpg",
              "bio": [
                  "this is test"
              ],
              "category": [
                  "Snapshot",
                  "Other",
                  "Livestream",
                  "Recording"
              ],
              "includedActivities": [],
              "excludedActivities": [],
              "deleted": false,
              "firstname": "chandan",
              "lastname": "lunthi",
              "username": "chandanlunthi",
              "email": "chandan.lunthi@oodlestechnologies.com",
              "hashedPassword": "$2b$10$PLA/DLbYiIXU7qo4ecZYh.ucAh0bePjVrdmGHFYTmz2s/6bP2xf96",
              "provider": "local",
              "otp": null,
              "updatedAt": "2020-05-03T12:48:11.813Z",
              "createdAt": "2020-03-18T14:58:28.031Z",
              "__v": 0,
              "privacySettings": {
                  "watchHistory": true
              },
              "notifications": {
                  "follower": false
              }
          }
      }
    ],
    "popularCategories": [
      {
          "categoryName": "Livestream",
          "totalVideos": 9,
          "maxViewedVideo": {
              "videoInfo": {
                  "thumbnail": [
                      "https://video-playback-public.s3.amazonaws.com/MainVideoThumbnail/c9AhiD-99WT76Ix66aXTW4EZ.png"
                  ],
                  "Categories": [
                      "Livestream"
                  ],
                  "Likes": [
                      "5ea9089fdb6e0c00071d1fa2"
                  ],
                  "shares": [],
                  "comments": [
                      "5ea6c88b9ba9f10008ba1922",
                      "5ea6c88e9ba9f10008ba1923",
                      "5ea6c8929ba9f10008ba1924",
                      "5ea908d7804dfe0008a6d726",
                      "5eaedaacb5078100087414af"
                  ],
                  "isPublished": true,
                  "publishTime": "1587668634202",
                  "viewCount": 170,
                  "level": 0,
                  "totallevel": 1,
                  "totalchild": 2,
                  "_id": "5ea1e3f58b16b10008a7f55d",
                  "user": "5e723713d43f9c0007ffad9d",
                  "name": "test.mp4",
                  "type": "main",
                  "URL": "https://videoplyback-encoding-bucket.s3.amazonaws.com/5e723713d43f9c0007ffad9d/test/transcoded/video.m3u8",
                  "poster": "https://videoplyback-encoding-bucket.s3.amazonaws.com/5e723713d43f9c0007ffad9d/test/poster-00001.png",
                  "videoID": "5e9fd41cdff67f00081aa0f0",
                  "duration": "55",
                  "parentId": "5e723713d43f9c0007ffad9d",
                  "Title": "this one",
                  "Description": "amd teo",
                  "time": 0,
                  "__v": 0,
                  "updatedAt": "2020-05-10T17:42:12.512Z"
              }
          }
      },
      {
          "categoryName": "Recording",
          "totalVideos": 8,
          "maxViewedVideo": {
              "videoInfo": {
                  "thumbnail": [],
                  "Categories": [
                      "Recording",
                      "Snapshot"
                  ],
                  "Likes": [
                      "5ea41a5f936fac00071be645",
                      "5ead4c1cf8db9b00073f9d76",
                      "5ead9f85a57b35000732e0e6",
                      "5ead9fcfa57b35000732e0ea",
                      "5eb59b577b5e14000717f932"
                  ],
                  "shares": [],
                  "comments": [
                      "5ea41a40936fac00071be644",
                      "5ea85b3249c2dd0007c8921e",
                      "5eac7bb5f2074300081db6a9",
                      "5eadbf79fa7de3000756e023",
                      "5eadbf87fa7de3000756e025",
                      "5eadc07efa7de3000756e028",
                      "5eadc10a68ad1c00073b7fd8",
                      "5eadc26168ad1c00073b7fdb",
                      "5eadc2ee4d79640008aee076",
                      "5eadcd0060c5e900074d0bc4",
                      "5eadcd0f60c5e900074d0bc6",
                      "5eae80086059450008aafae8",
                      "5eb59b507b5e14000717f92d"
                  ],
                  "isPublished": true,
                  "publishTime": "1587679992715",
                  "viewCount": 342,
                  "level": 0,
                  "totallevel": 0,
                  "totalchild": 0,
                  "_id": "5ea2121c5501390008546b0e",
                  "user": "5e94a29f9889a90008f61369",
                  "name": "CreatingaTCPServerinC.mp4",
                  "type": "main",
                  "URL": "https://videoplyback-encoding-bucket.s3.amazonaws.com/5e94a29f9889a90008f61369/CreatingaTCPServerinC/transcoded/video.m3u8",
                  "poster": "https://videoplyback-encoding-bucket.s3.amazonaws.com/5e94a29f9889a90008f61369/CreatingaTCPServerinC/poster-00001.png",
                  "videoID": "5e96b1f9335afc0008c919d9",
                  "duration": "1050.08",
                  "parentId": "5e94a29f9889a90008f61369",
                  "Title": "My Fisrt Video",
                  "Description": "Instagram is an American photo and video-sharing social networking service owned by Facebook, Inc. It was created by Kevin Systrom and Mike Krieger, and launched in October 2010 on iOS",
                  "time": 0,
                  "__v": 0,
                  "updatedAt": "2020-05-09T15:54:00.369Z"
              }
          }
      },
      {
          "categoryName": "Other",
          "totalVideos": 5,
          "maxViewedVideo": {
              "videoInfo": {
                  "thumbnail": [],
                  "Categories": [
                      "Livestream",
                      "Other"
                  ],
                  "Likes": [
                      "5ea996b951cad60008f7ccc9"
                  ],
                  "shares": [],
                  "comments": [
                      "5eb053c7048db30008c180f9",
                      "5eb053d0048db30008c180ff"
                  ],
                  "isPublished": true,
                  "publishTime": "1588150259828",
                  "viewCount": 96,
                  "level": 0,
                  "totallevel": 0,
                  "totalchild": 0,
                  "_id": "5e9be40f56bf0400077b1133",
                  "user": "5e723713d43f9c0007ffad9d",
                  "name": "thisoisfina.mp4",
                  "type": "main",
                  "URL": "https://videoplyback-encoding-bucket.s3.amazonaws.com/5e723713d43f9c0007ffad9d/thisoisfina/transcoded/video.m3u8",
                  "poster": "https://videoplyback-encoding-bucket.s3.amazonaws.com/5e723713d43f9c0007ffad9d/thisoisfina/poster-00001.png",
                  "videoID": "5e99ded998fe34000770e0be",
                  "parentId": "5e723713d43f9c0007ffad9d",
                  "Title": "this",
                  "Description": "is tsest",
                  "time": 7,
                  "__v": 0,
                  "updatedAt": "2020-05-09T19:00:12.037Z"
              }
          }
      },
      {
          "categoryName": "Snapshot",
          "totalVideos": 4,
          "maxViewedVideo": {
              "videoInfo": {
                  "thumbnail": [],
                  "Categories": [
                      "Recording",
                      "Snapshot"
                  ],
                  "Likes": [
                      "5ea41a5f936fac00071be645",
                      "5ead4c1cf8db9b00073f9d76",
                      "5ead9f85a57b35000732e0e6",
                      "5ead9fcfa57b35000732e0ea",
                      "5eb59b577b5e14000717f932"
                  ],
                  "shares": [],
                  "comments": [
                      "5ea41a40936fac00071be644",
                      "5ea85b3249c2dd0007c8921e",
                      "5eac7bb5f2074300081db6a9",
                      "5eadbf79fa7de3000756e023",
                      "5eadbf87fa7de3000756e025",
                      "5eadc07efa7de3000756e028",
                      "5eadc10a68ad1c00073b7fd8",
                      "5eadc26168ad1c00073b7fdb",
                      "5eadc2ee4d79640008aee076",
                      "5eadcd0060c5e900074d0bc4",
                      "5eadcd0f60c5e900074d0bc6",
                      "5eae80086059450008aafae8",
                      "5eb59b507b5e14000717f92d"
                  ],
                  "isPublished": true,
                  "publishTime": "1587679992715",
                  "viewCount": 342,
                  "level": 0,
                  "totallevel": 0,
                  "totalchild": 0,
                  "_id": "5ea2121c5501390008546b0e",
                  "user": "5e94a29f9889a90008f61369",
                  "name": "CreatingaTCPServerinC.mp4",
                  "type": "main",
                  "URL": "https://videoplyback-encoding-bucket.s3.amazonaws.com/5e94a29f9889a90008f61369/CreatingaTCPServerinC/transcoded/video.m3u8",
                  "poster": "https://videoplyback-encoding-bucket.s3.amazonaws.com/5e94a29f9889a90008f61369/CreatingaTCPServerinC/poster-00001.png",
                  "videoID": "5e96b1f9335afc0008c919d9",
                  "duration": "1050.08",
                  "parentId": "5e94a29f9889a90008f61369",
                  "Title": "My Fisrt Video",
                  "Description": "Instagram is an American photo and video-sharing social networking service owned by Facebook, Inc. It was created by Kevin Systrom and Mike Krieger, and launched in October 2010 on iOS",
                  "time": 0,
                  "__v": 0,
                  "updatedAt": "2020-05-09T15:54:00.369Z"
              }
          }
      }
    ]
  }

  sliderData: Array<any> = [
      {
        parent: {
            "title": "Parent Title 1",
            "poster": "../../../assets/images/hbf-images/hb-play1.jpg",
            "categories": ["Lating", "Salsa", "Tango"]
        },
        children: [
            {
                "index": "1",
                "poster": "../../../assets/images/landing-page/tekken.jpg"
            }, 
            {
                "index": "2",
                "poster": "../../../assets/images/landing-page/team-loard.jpg"
            }, 
            {
                "index": "3",
                "poster": "../../../assets/images/landing-page/spaceship.jpg"
            }
        ]
      }, 
      {
        parent: {
            "title": "Parent Title 2",
            "poster": "../../../assets/images/hbf-images/hb-play2.jpg",
            "categories": ["Italian", "Spanish", "Chinese"]
        },
        children: [
            {
                "index": "1",
                "poster": "../../../assets/images/landing-page/space.png"
            }, 
            {
                "index": "2",
                "poster": "../../../assets/images/landing-page/spaceship.jpg"
            }, 
            {
                "index": "3",
                "poster": "../../../assets/images/landing-page/team-loard.jpg"
            }
        ]
      }, 
      {
        parent: {
            "title": "Parent Title 3",
            "poster": "../../../assets/images/hbf-images/hb-play3.jpg",
            "categories": ["Indian", "American"]
        },
        children: [
            {
                "index": "1",
                "poster": "../../../assets/images/landing-page/team-loard.jpg"
            }, 
            {
                "index": "2",
                "poster": "../../../assets/images/landing-page/space.png"
            }
        ]
      }, 
      {
        parent: {
            "title": "Parent Title 4",
            "poster": "../../../assets/images/hbf-images/hb-play4.jpg",
            "categories": ["One", "Two", "Three", "Four"]
        },
        children: [
            {
                "index": "1",
                "poster": "../../../assets/images/landing-page/space.png"
            }, 
            {
                "index": "2",
                "poster": "../../../assets/images/landing-page/spaceship.jpg"
            }, 
            {
                "index": "3",
                "poster": "../../../assets/images/landing-page/team-loard.jpg"
            }, 
            {
                "index": "4",
                "poster": "../../../assets/images/landing-page/tekken.jpg"
            }
        ]
      }
    ];

  constructor() { }

  getLandingPageData() {
    return of(this.data);
  }

  getSliderData() {
      return of(this.sliderData);
  }
}
