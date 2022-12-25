export default `<h4 class="text-center d-flex">Members {{{ addButton }}}</h4>
                    {{{ addUserModal }}}
                    <div class="users-list">
                        {{#each users}}
                            <div class="">{{this}}</div>
                        {{/each}}
                    </div>`
