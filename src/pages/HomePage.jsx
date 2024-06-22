import {Component, createRef} from "react";

import {Container} from "react-bootstrap";
import {ToastContainer, toast} from "react-toastify";
import ContactForm from "../components/Form/ContactForm";
import ContactHeader from "../components/Header/ContactHeader";
import ContactCard from "../components/Card/ContactCard";
import {v4} from "uuid";

export class HomePage extends Component {
  constructor(props) {
    super(props);
    this.searchRef = createRef();
    this.firstnameRef = createRef();
    this.lastnameRef = createRef();
    this.phoneNumberRef = createRef();

    this.state = {
      contacts: JSON.parse(localStorage.getItem("contacts")) || [
        {
          id: 0,
          firstname: "John",
          lastname: "Doe",
          phoneNumber: "+998901234567",
          category: "family",
          isFavourite: false,
        },
        {
          id: 1,
          firstname: "Jane",
          lastname: "Doe",
          phoneNumber: "+998901234567",
          category: "friends",
          isFavourite: false,
        },
        {
          id: 2,
          firstname: "Alice",
          lastname: "Doe",
          phoneNumber: "+998901234567",
          category: "relatives",
          isFavourite: false,
        },
        {
          id: 3,
          firstname: "Bob",
          lastname: "Doe",
          phoneNumber: "+998901234567",
          category: "other",
          isFavourite: false,
        },
      ],
      contact: {
        firstname: "",
        lastname: "",
        phoneNumber: "+998",
        category: "family",
        isFavourite: false,
      },
      validated: false,
      selected: null,
      search: "",
      category: "all",
      favourites: "all",
      sort: "asc",
    };
  }
  render() {
    const {
      contacts,
      contact,
      selected,
      validated,
      search,
      category,
      favourites,
      sort,
    } = this.state;

    const handleContact = (e) => {
      this.setState({
        contact: {
          ...contact,
          [e.target.id]: e.target.value,
        },
      });
    };

    const handleSearch = () => {
      this.setState({
        search: this.searchRef.current.value.trim().toLowerCase(),
      });
    };

    const handleCategory = (e) => {
      this.setState({category: e.target.value});
    };

    const handleFavourites = (e) => {
      this.setState({favourites: e.target.value});
    };

    const handleSort = (e) => {
      this.setState({sort: e.target.value});
    };

    const submit = (e) => {
      e.preventDefault();
      console.log("Submmit");
      this.setState({validated: true});
      if (e.target.checkValidity()) {
        let newContacts;
        let newContact = {...contact, id: v4()};
        if (selected === null) {
          newContacts = [...contacts, newContact];
          toast.success("Added successfully!");
        } else {
          newContacts = contacts.map((contact) => {
            if (contact.id === selected) {
              return newContact;
            }
            return contact;
          });
          toast.info("Edited successfully!");
        }
        localStorage.setItem("contacts", JSON.stringify(newContacts));
        this.firstnameRef.current.focus();
        this.setState({
          contacts: newContacts,
          contact: {
            firstname: "",
            lastname: "",
            phoneNumber: "+998",
            category: "family",
            isFavourite: false,
            id: v4(),
          },
          selected: null,
          validated: false,
        });
      } else {
        this.setState({validated: true});
      }
    };

    const editContact = (id) => {
      const contact = contacts.find((contact) => contact.id === id);
      this.setState({contact, selected: id});
    };

    const deleteContact = (id) => {
      let newContacts = contacts.filter((contact) => contact.id !== id);
      this.setState({contacts: newContacts});
      localStorage.setItem("contacts", JSON.stringify(newContacts));
    };

    const favourite = (id) => {
      console.log(id);
      this.setState(
        (prevState) => {
          const updatedContacts = prevState.contacts.map((contact) =>
            contact.id === id
              ? {...contact, isFavourite: !contact.isFavourite}
              : contact,
          );
          return {contacts: updatedContacts};
        },
        () => {
          localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
        },
      );
    };

    let allContacts = contacts.filter((contact) =>
      `${contact.firstname} ${contact.lastname}`.toLowerCase().includes(search),
    );

    allContacts.sort((a, b) => {
      const nameA = `${a.firstname} ${a.lastname}`.toLowerCase();
      const nameB = `${b.firstname} ${b.lastname}`.toLowerCase();
      if (sort === "asc") {
        return nameA > nameB ? 1 : -1;
      } else {
        return nameA < nameB ? 1 : -1;
      }
    });

    if (category !== "all") {
      allContacts = allContacts.filter(
        (contact) => contact.category === category,
      );
    }

    if (favourites !== "all") {
      allContacts = allContacts.filter(
        (contact) => contact.isFavourite === true,
      );
    }

    return (
      <Container>
        <ToastContainer />
        <ContactForm
          contact={contact}
          firstnameRef={this.firstnameRef}
          lastnameRef={this.lastnameRef}
          phoneNumberRef={this.phoneNumberRef}
          handleContact={handleContact}
          selected={selected}
          validated={validated}
          submit={submit}
        />
        <ContactHeader
          handleSearch={handleSearch}
          searchRef={this.searchRef}
          handleCategory={handleCategory}
          category={category}
          handleFavourites={handleFavourites}
          favourites={favourites}
          handleSort={handleSort}
          sort={sort}
        />
        {allContacts.map((contact, id) => (
          <ContactCard
            key={id}
            {...contact}
            editContact={editContact}
            deleteContact={deleteContact}
            favourite={favourite}
          />
        ))}
      </Container>
    );
  }
}

export default HomePage;
