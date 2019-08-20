import React from 'react';
import TeamInfo from '../../elements/teamInfo';
import PostData from '../../elements/postData';

const Header = (props) => {

    const teamInfo = (team) => {
        return team ? (
            <TeamInfo team={team} />
        ) : null;
    }

    const postData = (date,author) => (
        <PostData data={{date, author}}/>
    )

    return (
        <div>
            {teamInfo(props.teamData)}
            {postData(props.date, props.author)}
        </div>
    );
};

export default Header;