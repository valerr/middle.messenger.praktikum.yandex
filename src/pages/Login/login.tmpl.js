export default `<div id="login-page">
        <div class="login-form">
            <header>Sign in</header>
            <form>
                <label class="text-muted" for="login">Username</label>
                <input type="text" name="login">
                <label class="text-muted" for="password">Password</label>
                <input type="text" name="password" id="password">
                    {{{ signInButton }}}
                    {{{ registerButton }}}
            </form>
        </div>
    </div>`