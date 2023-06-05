import React, { useEffect, useState } from 'react';

const INIT_DATA = ['Abigail', 'Alexandra', 'Alison', 'Amanda', 'Amelia', 'Amy', 'Andrea',
    'Angela', 'Anna', 'Anne', 'Audrey', 'Ava', 'Bella', 'Bernadette', 'Carol', 'Caroline',
    'Carolyn', 'Chloe', 'Claire', 'Deirdre', 'Diana', 'Diane', 'Donna', 'Dorothy', 'Elizabeth',
    'Ella', 'Emily', 'Emma', 'Faith', 'Felicity', 'Fiona', 'Gabrielle', 'Grace', 'Hannah', 'Heather',
    'Irene', 'Jan', 'Jane', 'Jasmine', 'Jennifer', 'Jessica', 'Joan', 'Joanne', 'Julia', 'Karen', 'Katherine',
    'Kimberly', 'Kylie', 'Lauren', 'Leah', 'Lillian', 'Lily', 'Lisa', 'Madeleine', 'Maria', 'Mary', 'Megan', 'Melanie',
    'Michelle', 'Molly', 'Natalie', 'Nicola', 'Olivia', 'Penelope', 'Pippa', 'Rachel', 'Rebecca', 'Rose', 'Ruth',
    'Sally', 'Samantha', 'Sarah', 'Sonia', 'Sophie', 'Stephanie', 'Sue', 'Theresa', 'Tracey', 'Una', 'Vanessa', 'Victoria',
    'Virginia', 'Wanda', 'Wendy', 'Yvonne', 'Zoe'];

export default function VanilaInfiniteScroller() {
    const [data, setData] = useState(INIT_DATA.slice(0, 12));


    function handelScroll(e) {
        const { scrollHeight, scrollTop, clientHeight } = e.target;
        if (Math.abs(scrollHeight - clientHeight - scrollTop) < 1) {
            let len = data.length;
            len = len < INIT_DATA.length ? len + 5 : len;
            setData(INIT_DATA.slice(0, len));
        }
    }

    useEffect(() => {
        document.getElementById('scorlled-conetent').addEventListener('scroll', (e) => handelScroll(e));
        return () => window.removeEventListener("scroll", handelScroll);
    })

    return (
        <div style={{ border: 'solid 1px red', margin: 10, textAlign: 'center', padding: 10 }}>
            <div id='scorlled-conetent' style={{ border: 'solid 1px blue', width: 200, height: 200, margin: 'auto', textAlign: 'center', overflowY: 'scroll' }}>
                {data.map((e, i) => (
                    <div key={i}>{e}</div>
                ))}
            </div>
        </div>
    );
}


