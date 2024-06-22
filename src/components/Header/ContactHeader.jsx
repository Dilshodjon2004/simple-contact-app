import {Component} from "react";
import {Form, InputGroup} from "react-bootstrap";

export class ContactHeader extends Component {
  render() {
    const {
      searchRef,
      handleSearch,
      category,
      handleCategory,
      favourites,
      handleFavourites,
      sort,
      handleSort,
    } = this.props;
    return (
      <InputGroup className='my-3'>
        <Form.Control
          onChange={handleSearch}
          ref={searchRef}
          placeholder='Searching contact...'
        />
        <InputGroup.Text>
          <Form.Select onChange={handleCategory} value={category}>
            <option value='all'>Show all categories</option>
            <option value='family'>Family</option>
            <option value='friends'>Friends</option>
            <option value='relatives'>Relatives</option>
            <option value='other'>Other</option>
          </Form.Select>
        </InputGroup.Text>
        <InputGroup.Text>
          <Form.Select onChange={handleFavourites} value={favourites}>
            <option value='all'>Show all contacts</option>
            <option value='favourites'>Only favourites</option>
          </Form.Select>
        </InputGroup.Text>
        <InputGroup.Text>
          <Form.Select onChange={handleSort} value={sort}>
            <option value='asc'>A-Z</option>
            <option value='desc'>Z-A</option>
          </Form.Select>
        </InputGroup.Text>
      </InputGroup>
    );
  }
}

export default ContactHeader;
