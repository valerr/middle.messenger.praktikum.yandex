export default `<div id="register">
        <div class="login-form">
            <header>Create account</header>
            <form>
                <div>
                    {{#each data}}
                        <label for="{{@key}}" class="text-muted">{{this}}</label>
                    {{/each}}
                </div>
                <div class="login-inputs">
                    {{#each inputs}}
                         {{{this}}}
                         <span class="error-message"></span>
                    {{/each}}
                </div>
                <div class="mt-auto">
                    {{{ registerButton }}}
                    {{{ signInButton }}}
                </div>
            </form>
        </div>
    </div>`