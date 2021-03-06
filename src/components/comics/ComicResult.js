import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadOneComic, addComic } from './actions';
import { getUser } from '../auth/reducers';
import styles from './ComicResult.css';

class ComicResult extends PureComponent {
  static propTypes = {
    comic: PropTypes.object.isRequired,
    user: PropTypes.object
  };


  handleAdd = comicId => {
    const { user, comic, loadOneComic, addComic } = this.props;
    comicId = comic.comicId;
    return loadOneComic(comicId)
      .then(data => {
        data.payload.user = user.id;
        addComic(data.payload);
      });
  };
  
  render() {
    const { comic } = this.props;
    return (
      <div className={styles.comic}>
        <div className="media">
          <div className="img">
            <img src={comic.image}/>
          </div>
          <h2 className="title">{comic.name}</h2>
          <div className="content">
            <h2>{comic.issueName}</h2>
            <p>Volume: {comic.volumeName}</p>
            <p>Volume: {comic.coverDate}</p>
          </div>
          <div className="footer">
            <button onClick={this.handleAdd}>➕ Collection</button>
          </div>
        </div>
      </div>
    );
  }
}


export default connect(
  state => ({
    user: getUser(state)
  }),
  { loadOneComic, addComic }
)(ComicResult);
