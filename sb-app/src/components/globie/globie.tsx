import { useState, useEffect, useRef } from 'react';
import Globe from 'vanta/dist/vanta.globe.min';



const Globie = (props: any) => {
    const [vantaEffect, setVantaEffect] = useState<any>(null);
    const myRef = useRef(null)
    useEffect(() => {
        if (!vantaEffect) {
            setVantaEffect(Globe({
            el: myRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x3f55ff
            }))
    }

    return () => {
        if (vantaEffect) vantaEffect.destroy()
    }
    }, [vantaEffect]);

    return <div ref={myRef} />;
}
export default  Globie;
