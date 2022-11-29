export default `<div id="login-page">
        <div class="login-form">
            <header>Sign in</header>
            <form>
                <div class="d-flex">
                    <label class="text-muted" for="login">Username</label>
                    <input type="text" name="login">
                </div>
                <div class="d-flex">
                    <label class="text-muted" for="password">Password</label>
                    <input type="text" name="password" id="password">
                </div>
                    {{{ signInButton }}}
                    {{{ registerButton }}}
            </form>
        </div>
    </div>`