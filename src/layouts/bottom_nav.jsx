export const BottomNav = () => {

    var icon_react = require('../images/icon_react_wht.png');

    var icon_firebase = require('../images/icon_firebase_wht.png');

    var icon_javascript = require('../images/icon_javascript_wht.png');

    var icon_css3 = require('../images/icon_css3_wht.png');

    var icon_html5 = require('../images/icon_html5_wht.png');

    //---

    return (

        <footer className=" fixed-bottom pt-1 pb-1 pl-2 pr-2 nav_bttm">

            <div className="mt-0 mb-0 copyright_text">

               <span>&copy; Studio-Ryu, LLC</span> 

            </div>

            <div className="text-center poweredby_wrapper">

                <span className="text-center poweredby_text">Powered by</span>

                <div className="d-flex justify-content-between poweredby_icon_wrapper">

                    <p className="text-center poweredby_item mr-1"><img src={icon_react} className='icon react' alt='This site powered by React'/></p>
                    <p className="text-center poweredby_item mr-1"><img src={icon_firebase} className='icon firebase' alt='This site powered by Firebase/Firestore'/></p>
                    <p className="text-center poweredby_item mr-1"><img src={icon_javascript} className='icon javascript' alt='This site powered by JavaScript'/></p>
                    <p className="text-center poweredby_item mr-1"><img src={icon_css3} className='icon css3' alt='This site powered by CSS3'/></p>
                    <p className="text-center poweredby_item mr-1"><img src={icon_html5} className='icon html5' alt='This site powered by HTML5'/></p>

                </div>
            </div>
        </footer>

    );//end return

};//end BottomNav