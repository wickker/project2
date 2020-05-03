var React = require("react");

class Nav extends React.Component {
  render() {
    return (
      <nav class="navbar navbar-expand bg-light">
        <div className="container pl-3 pr-3">
          <a href="/" id="home-logo" class="navbar-brand">
            GYMNASTICS DB
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarsExample02"
            aria-controls="navbarsExample02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarsExample02">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item var whenpublic whenmember whenadmin">
                <a
                  class="nav-link"
                  href="/profiles/clubs"
                >
                  Clubs
                </a>
              </li>
              <li class="nav-item var whenpublic whenmember whenadmin">
                <a
                  class="nav-link"
                  href="/discipline"
                >
                  Disciplines
                </a>
              </li>
              {/* <li class="nav-item var whenmember">
                <a class="nav-link" href="/members">
                  My Dashboard
                </a>
              </li> */}
              <li class="nav-item var whenmember">
                <a class="nav-link" href="" id="mybio">
                  Biodata
                </a>
              </li>
              <li class="nav-item var whenmember">
                <a class="nav-link" href="" id="myprofile">
                 Membership Profile
                </a>
              </li>
              <li class="nav-item var whenadmin">
                <a class="nav-link" href="/profiles/athletes" id="myprofile">
                  Athletes
                </a>
              </li>

              <li class="nav-item dropdown var whenmember">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Edit
                </a>
                <div
                  class="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <a class="dropdown-item input" href="" id="editbio">
                    Biodata
                  </a>
                  <a class="dropdown-item input" href="" id="editprofile">
                    Membership Profile
                  </a>
                </div>
              </li>
              <li class="nav-item var whenmember whenadmin">
                <a class="nav-link" href="/logout">
                  Logout
                </a>
              </li>
            </ul>
            <form class="form-inline my-2 my-lg-0">
              <p id="admin-mode-text" class="my-2 my-sm-0 input"></p>
            </form>
          </div>
          <script></script>
        </div>
      </nav>
    );
  }
}

module.exports = Nav;
