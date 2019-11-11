import React from "react";
import PropTypes from "prop-types";

const PostsList = ({ list }) => {
  return (        
    <div className="card-wrapper">        
        {list.length !== 0 ? 
          list.map((post) => {
            return (                
                  <div key={post.id}>                      
                      <div className="post-container">    
                        <div className="post-thumb">
                          <img src={post.user.profile_image_url} alt={post.user.profile_image_url} />
                        </div>
                        <span className="post-title">{post.user.name}</span>
                        <span className="post-title">@{post.user.screen_name}</span>
                        <span className="post-title post-date">{post.created_at}</span>
                        <div className="post-content">
                            <p>{post.text}</p>
                        </div>
                      </div>
                    </div>
                );
            })
          : 
          <h4 className="no_results">No Results Found</h4>
        }
           
    </div>          
  );
};

PostsList.propTypes = {
  list: PropTypes.array.isRequired
};

PostsList.defaultProps = {
  list: []
};

export default PostsList;
