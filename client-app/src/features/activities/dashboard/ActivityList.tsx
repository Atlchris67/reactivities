import React, { SyntheticEvent, useState } from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite'; 



export default observer( function ActivityList() {
    const {activityStore} = useStore();
    const [target, setTarget] = useState('');
    const {loading, activitiesByDate, deleteActivity} = activityStore;

    function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteActivity(id);
    }
    
    
    return (
        <Segment>
            <Item.Group divided>
                {activitiesByDate.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            { <Item.Extra>
                              
                                <Button 
                                     
                                     name={activity.id + "_view"} 
                                     loading={loading && target === activity.id + "_view"} 
                                    onClick={() => activityStore.selectActivity(activity.id)}   
                                    floated='right' 
                                    content='View' 
                                    color='blue' />
                                <Button 
                                    name={activity.id + "_delete"}
                                    loading={loading && target === activity.id + "_delete"} 
                                    onClick={(e) => handleActivityDelete(e, activity.id)} 
                                    floated='right' 
                                    content='Delete' 
                                    color='red' 
                                />
                                <Label basic content={activity.category} />
                            </Item.Extra> }
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})

