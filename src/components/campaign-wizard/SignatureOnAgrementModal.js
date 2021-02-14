

import React, { useState, useRef } from "react";
// reactstrap components
import { Button, Modal} from "reactstrap";
import SignaturePad from 'react-signature-canvas'

// Core Components

const SignatureOnAgrementModal = ({ modalOpen, setModalOpen, setSignatureImage }) => {
    
    const [isSigned, setIsSigned] = useState(false);
    const sigPad = useRef({});
    
    const clsoeModal = () => {
        setModalOpen(!modalOpen)
    }

    const clear = () => {
        sigPad.current.clear()
        setIsSigned(false);
    }

    const startedSignForm = () => {
        setIsSigned(true);
    }

    const trim = () => {
        if (!sigPad.current.isEmpty()) {
            setSignatureImage(sigPad.current.getTrimmedCanvas().toDataURL('image/png'))
            clsoeModal()
        }
    }

    return (
        <>
            <Modal
                isOpen={modalOpen}
                toggle={clsoeModal}
                modalClassName=" bd-example-modal-lg"
            >
                <div className="modal-header">
                    <h5 className="modal-title float-right" id="exampleModalLabel">
                        חתימה על הסכם שימוש
                    </h5>
                    <button
                        aria-label="Close"
                        className="close"
                        onClick={clsoeModal}
                        type="button"
                    >
                        <span aria-hidden={true}>×</span>
                    </button>
                </div>
                <div className="modal-body bg-secondary">
                    <div>
                ורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית הועניב היושבב שערש שמחויט - שלושע ותלברו חשלו שעותלשך וחאית נובש ערששף. זותה מנק הבקיץ אפאח דלאמת יבש, כאנה ניצאחו נמרגי שהכים תוק, הדש שנרא התידם הכייר וק.

קונסקטורר אדיפיסינג אלית. סת אלמנקום ניסי נון ניבאה. דס איאקוליס וולופטה דיאם. וסטיבולום אט דולור, קראס אגת לקטוס וואל אאוגו וסטיבולום סוליסי טידום בעליק. קונדימנטום קורוס בליקרה, נונסטי קלובר בריקנה סטום, לפריקך תצטריק לרטי.

נולום ארווס סאפיאן - פוסיליס קוויס, אקווזמן קוואזי במר מודוף. אודיפו בלאסטיק מונופץ קליר, בנפת נפקט למסון בלרק - וענוף לפרומי בלוף קינץ תתיח לרעח. לת צשחמי צש בליא, מנסוטו צמלח לביקו ננבי, צמוקו בלוקריה שיצמה ברורק.

גולר מונפרר סוברט לורם שבצק יהול, לכנוץ בעריר גק ליץ, ושבעגט ליבם סולגק. בראיט ולחת צורק מונחף, בגורמי מגמש. תרבנך וסתעד לכנו סתשם השמה - לתכי מורגם בורק? לתיג ישבעס.

להאמית קרהשק סכעיט דז מא, מנכם למטכין נשואי מנורך. נולום ארווס סאפיאן - פוסיליס קוויס, אקווזמן קוואזי במר מודוף. אודיפו בלאסטיק מונופץ קליר, בנפת נפקט למסון בלרק - וענוף ושבעגט ליבם סולגק. בראיט ולחת צורק מונחף, בגורמי מגמש. תרבנך וסתעד לכנו סתשם השמה - לתכי מורגם בורק? לתיג ישבעס.
                    </div>
                    <SignaturePad ref={sigPad} canvasProps={{className: 'signature-canvas'}} onBegin={startedSignForm} />
                    <Button className="float-right" color="primary" type="button" onClick={trim} disabled={!isSigned} >
                        מאשר
                    </Button>
                    <Button className="float-left" color="secondary" type="button" onClick={clear}>
                        נקה חתימה
                    </Button>
                </div>
            </Modal>
        </>
    );
}

export default SignatureOnAgrementModal;
