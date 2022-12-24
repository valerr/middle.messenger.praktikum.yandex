export default `
        <div id="profile">
                    <div class="controls">
                         {{{ chatsButton }}}
                    </div>
                <div class="change-profile">
                     <div class="profile-content">
                        <div class="profile-image m-auto"></div>
                        {{{ changeAvatar }}}
                         <h2 class="fw-bold m-auto text-center">{{ name }}</h2>
                        <div class="editing">
                            {{{ form }}}
                        </div>
                    </div>
                    
                </div>
                
        </div>
`
