import querystring from 'querystring';
import QRCode from "react-qr-code";
interface QRCodeProps {
    chain: string;
    address: string;
    name: string;
    amount: string;
}

export default function QRCodeImg(props: QRCodeProps) {
    let link = window.location.href "/qr?" + querystring.stringify({
        name: props.name,
        chain: props.chain, 
        address: props.address, 
        amount: props.amount
    });
    
    return (
        <div className='flex-col items-center justify-center gap-2'>
            <QRCode value={link} />
            <a className='w-1/2' href={link}>{link}</a>
        </div>
    );
}
