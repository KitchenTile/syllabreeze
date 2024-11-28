const displayLoginPage = () => {
    document.getElementById("app").innerHTML = `
        <div class="login-screen-container">
        <div class="text-left">
            <div class="title-subtitle">
                <h1 class="title">Welcome to <span class="accent-word"> Syllabreeze</span></h1>
                <h2>Haikus that keep us together</h2>
            </div>
            <!-- <div class="title-carousel">
                <h1>Our daily curation</h1>
                <div class="login-carousel-container">
                    <div id="carouselSlides"></div>
                </div>
            </div> -->
        </div>
        <div class="wave">
            <!-- <svg id="visual" viewBox="0 0 960 540" width="960" height="540" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">
                <path
                    d="M702 540L711.7 517.5C721.3 495 740.7 450 701.2 405C661.7 360 563.3 315 514 270C464.7 225 464.3 180 478.5 135C492.7 90 521.3 45 535.7 22.5L550 0L960 0L960 22.5C960 45 960 90 960 135C960 180 960 225 960 270C960 315 960 360 960 405C960 450 960 495 960 517.5L960 540Z"
                    fill="#002233" stroke-linecap="round" stroke-linejoin="miter">
                </path>
            </svg> -->
            <!-- <svg id="visual" viewBox="0 0 960 540" width="960" height="540" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">
                <path
                    d="M646 540L652.3 517.5C658.7 495 671.3 450 658.5 405C645.7 360 607.3 315 582.2 270C557 225 545 180 561.2 135C577.3 90 621.7 45 643.8 22.5L666 0L960 0L960 22.5C960 45 960 90 960 135C960 180 960 225 960 270C960 315 960 360 960 405C960 450 960 495 960 517.5L960 540Z"
                    fill="#002233" stroke-linecap="round" stroke-linejoin="miter"></path>
            </svg> -->
           
            <svg id="svgs" viewBox="0 0 960 540" width="960" height="540" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">
                <path  id="visual" d="M426 540L428.8 517.5C431.7 495 437.3 450 465.2 405C493 360 543 315 534 270C525 225 457 180 435.8 135C414.7 90 440.3 45 453.2 22.5L466 0L960 0L960 22.5C960 45 960 90 960 135C960 180 960 225 960 270C960 315 960 360 960 405C960 450 960 495 960 517.5L960 540Z" fill="#002233" stroke-linecap="round" stroke-linejoin="miter"></path>
                <path id="visual2"
                    d="M474 540L502.3 517.5C530.7 495 587.3 450 596.5 405C605.7 360 567.3 315 539.2 270C511 225 493 180 494 135C495 90 515 45 525 22.5L535 0L960 0L960 22.5C960 45 960 90 960 135C960 180 960 225 960 270C960 315 960 360 960 405C960 450 960 495 960 517.5L960 540Z"
                    fill="#002233" stroke-linecap="round" stroke-linejoin="miter"></path>
                    <path id="visual3" d="M745 540L752.2 517.5C759.3 495 773.7 450 745 405C716.3 360 644.7 315 592.7 270C540.7 225 508.3 180 502 135C495.7 90 515.3 45 525.2 22.5L535 0L960 0L960 22.5C960 45 960 90 960 135C960 180 960 225 960 270C960 315 960 360 960 405C960 450 960 495 960 517.5L960 540Z" fill="#002233" stroke-linecap="round" stroke-linejoin="miter"></path>
            </svg>
        </div>
        <div class="register-login">
        <form class="form-container" id="createForm">
            <div id="register">
                <h1 class="form-title">Join us now!</h1>
                <div class="input-field">
                    <label for="fName">Full Name <span id="fNameSymbol"></span></label>
                    <input type="text" id="fName" name="fName" value="">
                </div>
                <div class="input-field">
                    <label for="regEmail">Email <span id="emailSymbol"></span></label>
                    <input type="text" id="regEmail" name="regEmail" value="">
                </div>
                <div class="input-field">
                    <label for="username">Username <span id="usernameSymbol"></span></label>
                    <input type="text" id="username" name="username" value="">
                </div>
                <div class="input-field">
                    <label for="regPassword">Password <span id="passwordSymbol"></span></label>
                    <input type="text" id="regPassword" name="regPassword" value="">
                </div>
                    <span> -- ♦ --</span>
                <button type="submit" class="button" id="registerBttn">Sign Up!
                    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="arrow-right-normal">
                            <path id="union-1" fill-rule="evenodd" clip-rule="evenodd" d="M51.2204 30.3871C52.8476 28.7599 55.4858 28.7599 57.1129 30.3871L73.7796 47.0537C75.4068 48.6809 75.4068 51.3191 73.7796 52.9463L57.1129 69.613C55.4858 71.2401 52.8476 71.2401 51.2204 69.613C49.5932 67.9858 49.5932 65.3476 51.2204 63.7204L60.7741 54.1667H29.1667C26.8655 54.1667 25 52.3012 25 50C25 47.6988 26.8655 45.8333 29.1667 45.8333H60.7741L51.2204 36.2796C49.5932 34.6524 49.5932 32.0142 51.2204 30.3871Z" fill="white"/>
                        </g>
                    </svg>
                </button>
                <div class="error-message" id="error message"></div>
                <p class="login-message">Or <a href="#" id="show-login">log in</a> with an existing account</p>

            </div>
            <div id="login" class="visible">
                <h1 class="form-title">Log in here!</h1>
                <div class="input-field">
                    <label for="email">Email <span id="loginEmailSymbol"></span></label>
                    <input type="text" id="loginEmail" name="email" value="">
                </div>
                <div class="input-field">
                    <label for="password">Password <span id="loginPasswordSymbol"></span></label>
                    <input type="text" id="loginPassword" name="password" value="">
                </div>
                    <span> -- ♦ --</span>
                <button type="submit" class="button" id="loginBttn">Log In!
                    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="arrow-right-normal">
                            <path id="union-1" fill-rule="evenodd" clip-rule="evenodd" d="M51.2204 30.3871C52.8476 28.7599 55.4858 28.7599 57.1129 30.3871L73.7796 47.0537C75.4068 48.6809 75.4068 51.3191 73.7796 52.9463L57.1129 69.613C55.4858 71.2401 52.8476 71.2401 51.2204 69.613C49.5932 67.9858 49.5932 65.3476 51.2204 63.7204L60.7741 54.1667H29.1667C26.8655 54.1667 25 52.3012 25 50C25 47.6988 26.8655 45.8333 29.1667 45.8333H60.7741L51.2204 36.2796C49.5932 34.6524 49.5932 32.0142 51.2204 30.3871Z" fill="white"/>
                        </g>
                    </svg>
                </button>
                <div class="error-message" id="error message"></div>    
                <p class="login-message">Or <a href="#" id="show-register">register</a> to create account</p>
            </div>
        </form>
        </div>
    </div>
    `
}

export default displayLoginPage;