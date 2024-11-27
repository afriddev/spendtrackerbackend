'use client'

export default function Home() {


  async function a(){
    const response = await fetch('http://localhost:3000/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        emailId:"afridayan01@gmail.com",
        password:"adsadsa",
        firstName:"shaik"
      }),
    });
    console.log(response.json())
  }
  a()




  return (
   <div>Spend Tracker</div>
  );
}
