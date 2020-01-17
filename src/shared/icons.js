import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrashAlt,
  faShareSquare,
  faEllipsisV,
} from '@fortawesome/free-solid-svg-icons';

const Icon = (icon) => () => <FontAwesomeIcon icon={icon}></FontAwesomeIcon>;

export const DeleteIcon = Icon(faTrashAlt);

export const ShareIcon = Icon(faShareSquare);

export const Dots = Icon(faEllipsisV);
