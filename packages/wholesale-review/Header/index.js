import React from 'react';
import { NavBar } from '@example/components';
import backIcon from '../../assets/icons/icon-arrow-back.png';
class Header extends React.Component {
    handleClickbackPage (){
        let appVersionCode = document.querySelector('meta[name=app_version_code]').getAttribute( 'content' );
        if (parseInt(appVersionCode)> 0)  {
            AndroidFunction.logEvent("ws_review_button_back"); 
            window.backPage()
        }  else {
            history.go(-1)
        }
    }
    render() {
        return (
            <div>
                <NavBar 
                    onClick={this.handleClickbackPage.bind()} 
                    title={'Review Pesanan'}
                    imageSrc={backIcon}
                    iconRight={false}
                    />
            </div>
        )
    }
}
export default Header