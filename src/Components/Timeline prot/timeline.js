import React from 'react';
import rightImg from "../Timeline prot/correct.png"
import "../Timeline prot/timeline.css"
export default function TimeLine(props) {
    let item = props.items
    let list = []
    for (let i = 0; i < item.length - 1; i++) {
        list.push(
            <>
                <div className='timeline-segment'>
                    <div className='timeline-icon'>
                        <img className='timeline-image' src={rightImg} alt="right"></img>
                    </div>
                    <div className='timeline-title'>
                        <h5>{item[i].title}</h5>
                    </div>
                </div>
                <div className='timeline-segment'>
                    <div className='timeline-lineOuter'>
                        <div className="timeline-lineInner"></div>
                    </div>
                    <div className='timeline-description'>
                        <p>
                            {item[i].description}
                        </p>
                    </div>
                </div>
            </>
        )
    }
    return (
        <>
            {list}
            <div className='timeline-segment'>
                <div className='timeline-icon'>
                    <img className='timeline-image' src={rightImg} alt="right"></img>
                </div>
                <div className='timeline-title'>
                    <h5>{item[item.length - 1].title}</h5>
                </div>
            </div>
            <div className='timeline-segment'>
                <div className='timeline-lineOuter'>
                    
                </div>
                <div className='timeline-description'>
                    <p>
                        {item[item.length - 1].description}
                    </p>
                </div>
            </div>
        </>
    )
}