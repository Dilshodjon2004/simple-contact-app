import {Component} from "react";
import {Alert, Button} from "react-bootstrap";
import {BsHeart, BsHeartFill} from "react-icons/bs";
export class ContactCard extends Component {
  render() {
    const {
      id,
      firstname,
      lastname,
      phoneNumber,
      isFavourite,
      category,
      editContact,
      deleteContact,
      favourite,
    } = this.props;
    return (
      <Alert className='d-flex justify-content-between align-items-center'>
        <div>
          <span>{firstname}</span> <span>{lastname}</span>
        </div>
        <div>
          <p>{phoneNumber}</p>
        </div>
        <div>
          <span className={`badge bg-warning me-3`}>{category}</span>
          {isFavourite ? (
            <BsHeartFill
              className='me-3'
              size={25}
              color='red'
              onClick={() => favourite(id)}
            />
          ) : (
            <BsHeart
              className='me-3'
              size={25}
              color='black'
              onClick={() => favourite(id)}
            />
          )}

          <Button
            className='me-3'
            variant='primary'
            onClick={() => editContact(id)}
          >
            Edit
          </Button>
          <Button variant='danger' onClick={() => deleteContact(id)}>
            Delete
          </Button>
        </div>
      </Alert>
    );
  }
}

export default ContactCard;
