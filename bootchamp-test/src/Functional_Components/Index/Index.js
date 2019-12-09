import React from 'react'
import './Index.css'

const Index = () => {
  return (
    <div>
      <h1>In Progress.....</h1>
      <h3 className="Bootchamp-Desc">
        Tech-Bootcamps are great and all, but they don't neccessarily end with
        you being job-ready. That's where bootchamp comes in to fill the gap.
      </h3>
      <br />
      <h3 className="Bootchamp-Desc">
        Bootchamp is like Reddit, but for Tech-Bootcamp grads and Junior Devs to
        share helpful intermediate and advanced resources tagged by City (for
        job-market specific related resources) and/or topic/framework.
      </h3>
      <br />
      <h3 className="Bootchamp-Desc">
        Build your profile full of Your own topics, upvote and save other's
        topics, join your relevant job market cities, and connect with user's
        near you! ... When we finish building the site...
      </h3>
      <h3 className="Bootchamp-Desc">
        For now, you can check out the Docs and the github. This is an
        open-source project.
        <br />
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://github.com/kirbycampbell/bootchamptest/tree/master/bootchamp-test/src"
        >
          Source Code
        </a>
        &
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://github.com/kirbycampbell/bootchamptest/tree/master/bootchamp-test/src/server/routes/api/API_Docs"
        >
          API Docs
        </a>
      </h3>
    </div>
  )
}
export default Index
