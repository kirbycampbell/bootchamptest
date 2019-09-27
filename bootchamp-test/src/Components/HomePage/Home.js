import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <section className="hero  is-fullheight is-desktop ">
      {/* ::::::::::::::: NAVBAR Section ::::::::::::::: */}
      <div className="hero-head  ">
        <nav className="navbar is-fixed-top has-background-black-ter ">
          <div className="container ">
            <div className="navbar-brand ">
              <a className="navbar-item">
                <img
                  src={process.env.PUBLIC_URL + "BootchampLogo.png"}
                  alt="BCLogo"
                />
              </a>
              <span
                className="navbar-burger burger is-light"
                data-target="navbarMenuHeroA"
              >
                <span></span>
                <span></span>
                <span></span>
              </span>
            </div>
            <div id="navbarMenuHeroA" className="navbar-menu">
              <div className="navbar-end">
                <a className="navbar-item is-active">Home</a>
                <a className="navbar-item">Examples</a>
                <a className="navbar-item">Documentation</a>
                <span className="navbar-item">
                  <a className="button is-primary is-inverted">
                    <span className="icon">
                      <i className="fab fa-github"></i>
                    </span>
                    <span>Download</span>
                  </a>
                </span>
              </div>
            </div>
          </div>
        </nav>
      </div>
      {/* ::::::::::::::: LEFT MIDDLE SECTION ::::::::::::::: */}
      <div class="tile is-ancestor">
        <div class="tile is-parent ">
          <article class="tile is-child notification is-info ">
            <p class="title ">Middle tile</p>
            <p class="subtitle">With an image</p>
            <figure class="image is-4by3">
              <img src="https://bulma.io/images/placeholders/640x480.png" />
            </figure>
          </article>
        </div>

        {/* :::::::::::: RIGHT MIDDLE SECTION :::::::::::: */}
        <div class="tile is-vertical is-8">
          <div class="tile">
            <div class="tile is-parent is-vertical">
              <article class="tile is-child notification is-dark is-bordered border-card">
                <p class="title">...tiles</p>
                <p class="container">
                  <nav class="level is-mobile is-fluid">
                    <div class="level-item  ">
                      <div>
                        <p class="heading">Tweets</p>
                        <p class="title">3,456</p>
                      </div>
                    </div>

                    <div class="level-item has-text-centered">
                      <div>
                        <p class="heading">Followers</p>
                        <p class="title">456K</p>
                      </div>
                    </div>
                    <div class="level-item has-text-centered">
                      <div>
                        <p class="heading">Likes</p>
                        <p class="title">789</p>
                      </div>
                    </div>
                  </nav>
                </p>
              </article>
            </div>
          </div>
          <div class="tile is-parent">
            <article class="tile is-child notification is-danger">
              <p class="title">Wide tile</p>
              <p class="subtitle">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Libero volutpat sed cras ornare arcu dui. Sit amet justo donec
                enim diam vulputate ut. Convallis a cras semper auctor neque
                vitae tempus. Elit at imperdiet dui accumsan sit amet nulla
                facilisi. Nullam vehicula ipsum a arcu. Massa ultricies mi quis
                hendrerit dolor magna eget est. Diam vulputate ut pharetra sit
                amet aliquam id diam maecenas. Interdum velit euismod in
                pellentesque massa. Nunc id cursus metus aliquam eleifend. Nisl
                condimentum id venenatis a condimentum vitae sapien
                pellentesque. Ut tortor pretium viverra suspendisse potenti
                nullam ac tortor vitae. Ullamcorper malesuada proin libero nunc
                consequat. Vestibulum lectus mauris ultrices eros in. Orci porta
                non pulvinar neque laoreet. Pellentesque pulvinar pellentesque
                habitant morbi tristique senectus et. Vitae semper quis lectus
                nulla at volutpat diam ut venenatis. Neque volutpat ac tincidunt
                vitae semper. Adipiscing diam donec adipiscing tristique. Arcu
                risus quis varius quam quisque id. Pellentesque pulvinar
                pellentesque habitant morbi tristique senectus et netus et.
                Volutpat diam ut venenatis tellus in metus. Et molestie ac
                feugiat sed lectus vestibulum mattis. At ultrices mi tempus
                imperdiet nulla malesuada. Praesent elementum facilisis leo vel.
                Id nibh tortor id aliquet lectus. Ut morbi tincidunt augue
                interdum velit euismod in pellentesque massa. Nascetur ridiculus
                mus mauris vitae ultricies leo. Libero justo laoreet sit amet
                cursus sit. Aliquet sagittis id consectetur purus ut faucibus
                pulvinar elementum integer. Pharetra vel turpis nunc eget lorem
                dolor sed viverra. Pellentesque habitant morbi tristique
                senectus et netus et malesuada. Pellentesque elit eget gravida
                cum sociis. Blandit turpis cursus in hac habitasse. Eu non diam
                phasellus vestibulum lorem. Augue ut lectus arcu bibendum at
                varius. Imperdiet massa tincidunt nunc pulvinar sapien.
                Suspendisse ultrices gravida dictum fusce ut placerat orci
                nulla. Tristique senectus et netus et malesuada fames ac turpis
                egestas. Cursus risus at ultrices mi tempus. Id diam vel quam
                elementum pulvinar etiam non quam lacus. Pretium aenean pharetra
                magna ac placerat. Nunc pulvinar sapien et ligula ullamcorper
                malesuada. Orci nulla pellentesque dignissim enim sit amet
                venenatis urna. Ipsum suspendisse ultrices gravida dictum fusce
                ut placerat orci. Venenatis urna cursus eget nunc scelerisque
                viverra. Nunc non blandit massa enim nec dui nunc. Vivamus at
                augue eget arcu dictum varius duis at consectetur. Mattis
                rhoncus urna neque viverra. Enim ut tellus elementum sagittis
                vitae et. Et leo duis ut diam quam nulla porttitor massa id.
                Rhoncus est pellentesque elit ullamcorper. Nam at lectus urna
                duis convallis convallis. Diam maecenas sed enim ut sem viverra
                aliquet eget. Suspendisse sed nisi lacus sed viverra tellus.
                Posuere lorem ipsum dolor sit amet consectetur adipiscing elit.
                Consectetur lorem donec massa sapien. Ultrices sagittis orci a
                scelerisque purus semper. Tellus cras adipiscing enim eu turpis.
                Rhoncus urna neque viverra justo nec ultrices. Enim ut tellus
                elementum sagittis vitae et. Enim sed faucibus turpis in. Enim
                nec dui nunc mattis enim ut tellus elementum. Lectus sit amet
                est placerat in egestas. Eu feugiat pretium nibh ipsum consequat
                nisl vel pretium. Id leo in vitae turpis massa sed elementum.
                Adipiscing bibendum est ultricies integer quis auctor elit.
                Faucibus vitae aliquet nec ullamcorper sit amet. Maecenas
                accumsan lacus vel facilisis volutpat est velit egestas dui.
                Nunc congue nisi vitae suscipit tellus mauris a diam maecenas.
                Dictum at tempor commodo ullamcorper a lacus vestibulum sed
                arcu. Massa sed elementum tempus egestas. Faucibus purus in
                massa tempor nec feugiat nisl. Id aliquet lectus proin nibh nisl
                condimentum id venenatis a. Tortor pretium viverra suspendisse
                potenti nullam. Nibh praesent tristique magna sit amet purus. Id
                eu nisl nunc mi ipsum faucibus vitae. Id interdum velit laoreet
                id. Diam sollicitudin tempor id eu nisl. Est ullamcorper eget
                nulla facilisi etiam dignissim. Augue lacus viverra vitae
                congue. At ultrices mi tempus imperdiet nulla. Diam vel quam
                elementum pulvinar etiam non quam lacus. Erat velit scelerisque
                in dictum non consectetur. Ac feugiat sed lectus vestibulum
                mattis ullamcorper velit sed ullamcorper. Libero nunc consequat
                interdum varius sit amet mattis vulputate enim. Nascetur
                ridiculus mus mauris vitae ultricies leo integer malesuada. Quis
                hendrerit dolor magna eget est lorem ipsum dolor sit. Purus
                faucibus ornare suspendisse sed nisi lacus sed viverra. Morbi
                blandit cursus risus at ultrices mi. Nunc scelerisque viverra
                mauris in aliquam sem fringilla. Nunc sed blandit libero
                volutpat sed cras ornare arcu dui. Laoreet non curabitur gravida
                arcu ac tortor dignissim. Leo in vitae turpis massa sed
                elementum tempus. Tellus cras adipiscing enim eu turpis egestas
                pretium. Maecenas accumsan lacus vel facilisis volutpat est
                velit. Id cursus metus aliquam eleifend mi in nulla posuere.
              </p>
              <div class="content"></div>
            </article>
          </div>
        </div>
      </div>
      {/* ::::::::::::::: FOOTER SECTION ::::::::::::::: */}
      <div className="hero-foot">
        <nav className="tabs">
          <div className="container">
            <ul>
              <li className="is-active">
                <a>Overview</a>
              </li>
              <li>
                <a>Modifiers</a>
              </li>
              <li>
                <a>Grid</a>
              </li>
              <li>
                <a>Elements</a>
              </li>
              <li>
                <a>Components</a>
              </li>
              <li>
                <a>Layout</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </section>
  );
};

export default Home;
