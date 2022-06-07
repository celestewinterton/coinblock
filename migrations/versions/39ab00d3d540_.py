"""empty message

Revision ID: 39ab00d3d540
Revises: 
Create Date: 2022-06-07 10:55:55.829851

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '39ab00d3d540'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('crypto',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=True),
    sa.Column('symbol', sa.String(length=50), nullable=True),
    sa.Column('price', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name'),
    sa.UniqueConstraint('symbol')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('firstName', sa.String(length=50), nullable=False),
    sa.Column('lastName', sa.String(length=50), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('transactions',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('price', sa.Integer(), nullable=True),
    sa.Column('quantity', sa.Integer(), nullable=True),
    sa.Column('type', sa.String(length=100), nullable=True),
    sa.Column('credit', sa.String(length=255), nullable=True),
    sa.Column('debit', sa.String(length=255), nullable=True),
    sa.Column('status', sa.String(length=50), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('crypto_id', sa.Integer(), nullable=True),
    sa.Column('created_at', sa.DateTime(timezone=True), nullable=True),
    sa.ForeignKeyConstraint(['crypto_id'], ['crypto.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('watchlists',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('join_watchlist',
    sa.Column('watchlist_id', sa.Integer(), nullable=False),
    sa.Column('crypto_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['crypto_id'], ['crypto.id'], ),
    sa.ForeignKeyConstraint(['watchlist_id'], ['watchlists.id'], ),
    sa.PrimaryKeyConstraint('watchlist_id', 'crypto_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('join_watchlist')
    op.drop_table('watchlists')
    op.drop_table('transactions')
    op.drop_table('users')
    op.drop_table('crypto')
    # ### end Alembic commands ###
