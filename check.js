async function Myinfo() {
            const { error, data: { user } } = await client.auth.getUser()
            if (error) {
                alert(error.message)
            } else {
                console.log(user.user_metadata.email);

                const { data, error } = await client
                    .from('userInfo')
                    .select("*")
                    .eq('email', user.user_metadata.email)

                console.log(data[0].imgurl);
                console.log(data[0]);
                showprofile.innerHTML = `
                    <div>
                        <img src="${data[0].imgurl}" alt="" id="img">
            <h1>Name : ${data[0].name
                    }</h1>
            <p>Email : ${data[0].email}</p>
          </div>
        `


                document.getElementById('h1').textContent = `Welcome, ${data[0].name
                    }`
            }

            //         showprofile.innerHTML = `
            //   <img src="${publicurl}" alt="" id="img">
            //   <div>
            //     <h1>Name : ${user.user_metadata.display_name
            //             }</h1>
            //     <p>Email : ${user.user_metadata.email}</p>
            //   </div>
            // `
        }
