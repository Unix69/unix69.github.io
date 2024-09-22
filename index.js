import React from 'react';
import ReactDOM from 'react-dom';
import WebPageSections from './WebPageSections';
import WebPageHeader from './WebPageHeader';
import './styles.css';

ReactDOM.render(<WebPageHeader />, document.getElementById('WebPageHeader'));
ReactDOM.render(<WebPageSections />, document.getElementById('WebPageSections'));
