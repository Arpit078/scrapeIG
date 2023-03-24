const fs = require("fs")
const puppeteer = require('puppeteer');
// let data = {}
function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
 }

(async () => {
  const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();

  await page.goto('https://instagram.com/',{ waitUntil: 'domcontentloaded' });

  // Set screen size
  await page.setViewport({width: 1080, height: 1024});

  // Type into search box
  // Note we usually need type coercion since the type cannot be deduced, but for text selectors, `instanceof` checks may be better for runtime validation.
// const username = await page.waitForSelector('aria/Phone number, username, or email');
// const password = await page.waitForSelector('aria/Password');
// await page.waitFor(()=>{document.querySelectorAll('input').length})
await delay(10000)
await page.type('[name=username]', 'blabbla429');

await page.type('[name=password]', 'blabla@1156');
// await page.type('[name=password]', 'R6@NmH!ILZPfaoi');
// await delay(5000)
const userArr = ["reiiteri","toughbunnyforever","dbagdraws","morvalii", "uselxzs"]
await page.evaluate(()=>{
  document.querySelector("._acap").click()
    console.log("ok")
  })
await delay(30000)
  
for(let i=0;i<userArr.length;i++){
            
              
              let username = userArr[i];
              const followersArr = await page.evaluate(async ()=>{
                            const userarr = ["reiiteri","toughbunnyforever","dbagdraws","morvalii", "uselxzs"]
                            let i = 0
                            let username = userarr[i]

                            /**
                            * Initialized like this so typescript can infer the type
                            */
                            let followers = [{ username: "", full_name: "" }];
                            let followings = [{ username: "", full_name: "" }];
                            let dontFollowMeBack = [{ username: "", full_name: "" }];
                            let iDontFollowBack = [{ username: "", full_name: "" }];

                            followers = [];
                            followings = [];
                            dontFollowMeBack = [];
                            iDontFollowBack = [];
                            i++

                            const arr = (async () => {
                              try {
                                console.log(`Process started! Give it a couple of seconds`);

                                const userQueryRes = await fetch(
                                  `https://www.instagram.com/web/search/topsearch/?query=${username}`
                                );
                                const userQueryJson = await userQueryRes.json();

                                const userId = userQueryJson.users[0].user.pk;

                                let after = null;
                                let has_next = true;

                                while (has_next) {
                                  await fetch(
                                    `https://www.instagram.com/graphql/query/?query_hash=c76146de99bb02f6415203be841dd25a&variables=` +
                                      encodeURIComponent(
                                        JSON.stringify({
                                          id: userId,
                                          include_reel: true,
                                          fetch_mutual: true,
                                          first: 50,
                                          after: after,
                                        })
                                      )
                                  )
                                    .then((res) => res.json())
                                    .then((res) => {
                                      has_next = res.data.user.edge_followed_by.page_info.has_next_page;
                                      after = res.data.user.edge_followed_by.page_info.end_cursor;
                                      followers = followers.concat(
                                        res.data.user.edge_followed_by.edges.map(({ node }) => {
                                          return {
                                            username: node.username,
                                            full_name: node.full_name,
                                          };
                                        })
                                      );
                                    });
                                }

                                console.log({ followers });

                                after = null;
                                has_next = true;

                                while (has_next) {
                                  await fetch(
                                    `https://www.instagram.com/graphql/query/?query_hash=d04b0a864b4b54837c0d870b0e77e076&variables=` +
                                      encodeURIComponent(
                                        JSON.stringify({
                                          id: userId,
                                          include_reel: true,
                                          fetch_mutual: true,
                                          first: 50,
                                          after: after,
                                        })
                                      )
                                  )
                                    .then((res) => res.json())
                                    .then((res) => {
                                      has_next = res.data.user.edge_follow.page_info.has_next_page;
                                      after = res.data.user.edge_follow.page_info.end_cursor;
                                      followings = followings.concat(
                                        res.data.user.edge_follow.edges.map(({ node }) => {
                                          return {
                                            username: node.username,
                                            full_name: node.full_name,
                                          };
                                        })
                                      );
                                    });
                                }

                                console.log({ followings });

                                dontFollowMeBack = followings.filter((following) => {
                                  return !followers.find(
                                    (follower) => follower.username === following.username
                                  );
                                });

                                console.log({ dontFollowMeBack });

                                iDontFollowBack = followers.filter((follower) => {
                                  return !followings.find(
                                    (following) => following.username === follower.username
                                  );
                                });

                                console.log({ iDontFollowBack });

                                console.log(
                                  `Process is done: Type 'copy(followers)' or 'copy(followings)' or 'copy(dontFollowBack)' in the console and paste it into a text editor to take a look at it'`
                                );
                              return {followers,followings,iDontFollowBack,dontFollowMeBack}
                              } catch (err) {
                                console.log({ err });
                              }
                            })();
                              



            return arr


            })
                                              
                                  
                
            await delay(5000)

            console.log(followersArr)
            const data = `const ${username}data = ${JSON.stringify(followersArr)};module.exports = ${username}data`

            fs.writeFile(`../scrapedUsers/${username}.js`,data,(err)=>{
              if(err){console.log(err)}
              console.log("ok")
            })
}

await delay(5000)

await browser.close();
})()

