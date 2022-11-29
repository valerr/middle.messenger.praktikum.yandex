export default `<div class="profile-info editing">
                {{#each info}}
                    <div class="info-item">
                        <span class="fw-bold">{{this.key}}</span>
                        <div class="d-flex flex-column">
                            <input name="{{this.name}}" class="text-muted ml-auto">
                            <span class="error-message"></span>
                        </div>
                        
                    </div>
                {{/each}}
               
            </div>
            <div class="actions">
                    {{{ SaveButton }}}
                </div>
`