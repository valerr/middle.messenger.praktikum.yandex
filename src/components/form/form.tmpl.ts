export default `<div>
                    {{#each fields}}
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
                    {{{ submitButton }}}
                </div>`