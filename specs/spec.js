process.env.NODE_ENV = 'test'; 

const { expect } = require('chai');
const request = require('supertest');
const {app} = require('../app');
const connection = require('../db/connection.js')

describe('the API', () => {
 beforeEach(() => connection.seed.run());
 after(() => connection.destroy());
 describe('GET /users/allusers', () => {
    it('GET /users/allusers returns all users', () => {
      return request(app)
        .get('/api/users/allusers')
        .expect(200)
        .then((res) => {
          expect(res.body).to.eql({
            all_users: [
              {
                  username: "test_user1",
                  name_of_user: "Cecílio Souza",
                  membership_duration: "2 years",
                  profile_picture: "https://randomuser.me/api/portraits/men/83.jpg",
                },
                {
                  username: "test_user2",
                  name_of_user: "Sheila Hale",
                  membership_duration: "7 years",
                  profile_picture: "https://randomuser.me/api/portraits/women/68.jpg",
                },
                {
                  username: "test_user3",
                  name_of_user: "Diane Mercier",
                  membership_duration: "3 years",
                  profile_picture: "https://randomuser.me/api/portraits/women/71.jpg",
                },
              ]
            });
        });
    });
  });
    describe('GET /topics', () => {
      it('GET /topics returns all topics', () => {
        return request(app)
          .get('/api/topics')
          .expect(200)
          .then((res) => {
            expect(res.body).to.eql({
              all_topics: [
              {
                topic_name : "Biography",
                topic_description : "The story of somebody's life"
              },
              {
                topic_name : "Business",
                topic_description : "Stories and ideas about Business"
              },
              {
                topic_name : "Science-Fiction",
                topic_description : "Stories about criminals and crime"
              }
                ]
            });
          });
      });
    });
    describe('GET /users/:username', () => {
      it('GET /users/:username returns the correct user', () => {
        return request(app)
          .get('/api/users/test_user1')
          .expect(200)
          .then((res) => {
            expect(res.body).to.eql(
              {
                "requested_user": [
                  {
                    username: "test_user1",
                    name_of_user: "Cecílio Souza",
                    membership_duration: "2 years",
                    profile_picture: "https://randomuser.me/api/portraits/men/83.jpg",
                  }
                ]
              }
            );
          });
      });
    });
    describe('GET /bookreviews/:review_id', () => {
      it('GET /bookreview/:review_id returns the desired book review', () => {
        return request(app)
          .get('/api/bookreviews/1')
          .expect(200)
          .then((res) => {
            expect(res.body).to.eql(
              {
                "requestedBookReview": [
                  {
                    title: "test_review1",
                    topic_name: "Science-Fiction",
                    username: "test_user1",
                    body_of_review:
                      "I admit it, I never read 1984 until I was 32. It has a reputation of being a boring mandatory school book on a par with Of Mice And Men and Shakespeare, as a result I never went anywhere near it.\n\n    Wow, I was missing out!\n    \n    Yes, 1984 is a fascinating political treatise... but more importantly it’s a gloriously gripping novel. Characters are relatable, interesting and tragic, you really root for them and invest in what they’re going through. The imagery is evocative and the plot is full of twists and turns despite all of us knowing about Room 101, Big Brother etc from day to day life. I was up all night and read it in one sitting, literally couldn’t put it down.\n    \n    Don’t make the same mistake I did, don’t ignore it as a ‘boring’ or ‘dry’ - read it!",
                    year_book_written_in: 2019,
                    book_rating_out_of_5: 4,
                    review_id: 1,
                    review_votes: 3
                  }
                ]
              }
            );
          });
      });
    });
    describe('GET /bookreviews/:review_id/comments', () => {
      it('GET /bookreview/:review_id/comments returns the desired comments', () => {
        return request(app)
          .get('/api/bookreviews/1/comments')
          .expect(200)
          .then((res) => {
            expect(res.body).to.eql(
              {
                "theReviewsComments": [
                  {
                    body:
                      "Risus felisut egetlor tur pellente varius sodalesm ndisse esent. Accumsan.",
                    comment_key: 1,
                    review_id: 1,
                    comment_votes: -3,
                    username: "test_user3"
                  }
                ]
              }
            );
          });
      });
    });
});

// describe('GET /users/allusers', () => {
//   it('GET /users/allusers returns all users', () => {
//     return request(app)
//       .get('/api/users/allusers')
//       .expect(200)
//       .then((res) => {
//         expect(res.body).to.eql({
//           all_users: [
//             {
//                 username: "test_user1",
//                 name_of_user: "Cecílio Souza",
//                 membership_duration: "2 years",
//                 profile_picture: "https://randomuser.me/api/portraits/men/83.jpg",
//               },
//               {
//                 username: "test_user2",
//                 name_of_user: "Sheila Hale",
//                 membership_duration: "7 years",
//                 profile_picture: "https://randomuser.me/api/portraits/women/68.jpg",
//               },
//               {
//                 username: "test_user3",
//                 name_of_user: "Diane Mercier",
//                 membership_duration: "3 years",
//                 profile_picture: "https://randomuser.me/api/portraits/women/71.jpg",
//               },
//             ]
//           });
//       });
//   });
// });

// describe('GET /topics', () => {
//   it('GET /topics returns all topics', () => {
//     return request(app)
//       .get('/api/topics')
//       .expect(200)
//       .then((res) => {
//         expect(res.body).to.eql({
//           all_topics: [
//           {
//             topic_name : "Biography",
//             topic_description : "The story of somebody's life"
//           },
//           {
//             topic_name : "Business",
//             topic_description : "Stories and ideas about Business"
//           },
//           {
//             topic_name : "Science-Fiction",
//             topic_description : "Stories about criminals and crime"
//           }
//             ]
//         });
//       });
//   });
// });

// describe('GET /users/:username', () => {
//   it('GET /users/:username returns the correct user', () => {
//     return request(app)
//       .get('/api/users/test_user1')
//       .expect(200)
//       .then((res) => {
//         expect(res.body).to.eql(
//           {
//             "requested_user": [
//               {
//                 username: "test_user1",
//                 name_of_user: "Cecílio Souza",
//                 membership_duration: "2 years",
//                 profile_picture: "https://randomuser.me/api/portraits/men/83.jpg",
//               }
//             ]
//           }
//         );
//       });
//   });
// });

// describe('GET /bookreviews/:review_id', () => {
//   it('GET /bookreview/:review_id returns the desired book review', () => {
//     return request(app)
//       .get('/api/bookreviews/1')
//       .expect(200)
//       .then((res) => {
//         expect(res.body).to.eql(
//           {
//             "requestedBookReview": [
//               {
//                 title: "test_review1",
//                 topic_name: "Science-Fiction",
//                 username: "test_user1",
//                 body_of_review:
//                   "I admit it, I never read 1984 until I was 32. It has a reputation of being a boring mandatory school book on a par with Of Mice And Men and Shakespeare, as a result I never went anywhere near it.\n\n    Wow, I was missing out!\n    \n    Yes, 1984 is a fascinating political treatise... but more importantly it’s a gloriously gripping novel. Characters are relatable, interesting and tragic, you really root for them and invest in what they’re going through. The imagery is evocative and the plot is full of twists and turns despite all of us knowing about Room 101, Big Brother etc from day to day life. I was up all night and read it in one sitting, literally couldn’t put it down.\n    \n    Don’t make the same mistake I did, don’t ignore it as a ‘boring’ or ‘dry’ - read it!",
//                 year_book_written_in: 2019,
//                 book_rating_out_of_5: 4,
//                 review_id: 1,
//                 review_votes: 3
//               }
//             ]
//           }
//         );
//       });
//   });
// });

// describe('GET /bookreviews/:review_id/comments', () => {
//   it('GET /bookreview/:review_id/comments returns the desired comments', () => {
//     return request(app)
//       .get('/api/bookreviews/1/comments')
//       .expect(200)
//       .then((res) => {
//         expect(res.body).to.eql(
//           {
//             "theReviewsComments": [
//               {
//                 body:
//                   "Risus felisut egetlor tur pellente varius sodalesm ndisse esent. Accumsan.",
//                 comment_key: 1,
//                 review_id: 1,
//                 comment_votes: -3,
//                 username: "test_user3"
//               }
//             ]
//           }
//         );
//       });
//   });
// });