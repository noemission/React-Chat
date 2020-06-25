import React from "react";
import { connect } from 'react-redux'
import { ChatState } from "../store/reducer";

const mapStateToProps = ({ chat }: { chat: ChatState }) => ({ messageList: chat.messageList });
type Props = ReturnType<typeof mapStateToProps>

class MessageList extends React.Component<Props> {

    render() {
        return (
            <div>
                {this.props.messageList.map(message => <p key={message.id}> {message.text} </p>)}
            </div>
        );
    }
}

export default connect(mapStateToProps)(MessageList)