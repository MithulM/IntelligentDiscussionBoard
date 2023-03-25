import React, { useState } from 'react';
import './HomePage.css'


function HomePage() {
    const [content, setContent] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi consequat aliquam nisi, in venenatis dolor bibendum vel. Sed ac purus dignissim, placerat magna ac, malesuada tellus. Sed vel sodales orci, sed interdum ipsum. Vivamus eu tortor nisl. Suspendisse ultricies nibh nec tortor laoreet rutrum. Integer ac massa nulla. Nullam convallis malesuada est, sed cursus magna tincidunt ac.');

    return (
        <React.Fragment>
            <div className="content">{content}</div>
        </React.Fragment>
    );
}

export default HomePage;